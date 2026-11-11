#!/usr/bin/env python3
"""Pilotage de 4 prises (relais) branchées sur le GPIO d'un Raspberry Pi.

Lance un petit serveur web : depuis l'ordinateur relié en Ethernet,
ouvrir http://<ip-du-raspberry>:8080 dans un navigateur.

Aucune dépendance hors bibliothèque standard + gpiozero (préinstallé
sur Raspberry Pi OS). Sans GPIO disponible (ou avec MOCK=1), le serveur
tourne en mode simulation pour pouvoir tester sur n'importe quel PC.
"""

import json
import os
import sys
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

BASE = Path(__file__).resolve().parent
CONFIG_PATH = Path(os.environ.get("PRISES_CONFIG", BASE / "config.json"))
STATE_PATH = Path(os.environ.get("PRISES_STATE", BASE / "state.json"))
INDEX_HTML = (BASE / "static" / "index.html").read_bytes()


class MockRelay:
    """Relais simulé (tests hors Raspberry)."""

    def __init__(self, pin, **_):
        self.pin = pin
        self.value = 0

    def on(self):
        self.value = 1

    def off(self):
        self.value = 0


def make_relay_class():
    if os.environ.get("MOCK") == "1":
        return MockRelay, True
    try:
        from gpiozero import OutputDevice  # type: ignore

        return OutputDevice, False
    except Exception as exc:  # pas de GPIO : on simule
        print(f"[prises] GPIO indisponible ({exc}) -> mode simulation", file=sys.stderr)
        return MockRelay, True


class Outlets:
    def __init__(self, config):
        self.lock = threading.Lock()
        relay_cls, self.mock = make_relay_class()
        active_high = bool(config.get("active_high", False))
        self.names = [o["name"] for o in config["outlets"]]
        self.relays = [
            relay_cls(o["gpio"], active_high=active_high, initial_value=False)
            for o in config["outlets"]
        ]
        if config.get("restore_state_on_boot", True):
            self._restore()

    # --- persistance ----------------------------------------------------
    def _restore(self):
        try:
            saved = json.loads(STATE_PATH.read_text())
        except (OSError, ValueError):
            return
        for i, on in enumerate(saved.get("on", [])[: len(self.relays)]):
            self._apply(i, bool(on))

    def _save(self):
        try:
            tmp = STATE_PATH.with_suffix(".tmp")
            tmp.write_text(json.dumps({"on": self._states()}))
            tmp.replace(STATE_PATH)
        except OSError as exc:
            print(f"[prises] sauvegarde impossible : {exc}", file=sys.stderr)

    # --- commandes ------------------------------------------------------
    def _apply(self, i, on):
        (self.relays[i].on if on else self.relays[i].off)()

    def _states(self):
        return [bool(r.value) for r in self.relays]

    def state(self):
        with self.lock:
            return {
                "mock": self.mock,
                "outlets": [
                    {"id": i + 1, "name": n, "on": s}
                    for i, (n, s) in enumerate(zip(self.names, self._states()))
                ],
            }

    def set(self, index, on):
        with self.lock:
            if on is None:
                on = not bool(self.relays[index].value)
            self._apply(index, on)
            self._save()

    def set_all(self, on):
        with self.lock:
            for i in range(len(self.relays)):
                self._apply(i, on)
            self._save()


def make_handler(outlets):
    class Handler(BaseHTTPRequestHandler):
        server_version = "Prises/1.0"

        def log_message(self, fmt, *args):  # logs sobres
            sys.stderr.write("[prises] %s - %s\n" % (self.client_address[0], fmt % args))

        def _send(self, code, body, ctype="application/json"):
            data = body if isinstance(body, bytes) else json.dumps(body).encode()
            self.send_response(code)
            self.send_header("Content-Type", ctype)
            self.send_header("Content-Length", str(len(data)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(data)

        def _body(self):
            length = int(self.headers.get("Content-Length") or 0)
            if not length:
                return {}
            try:
                return json.loads(self.rfile.read(length))
            except ValueError:
                return None

        def do_GET(self):
            if self.path in ("/", "/index.html"):
                return self._send(200, INDEX_HTML, "text/html; charset=utf-8")
            if self.path == "/api/state":
                return self._send(200, outlets.state())
            self._send(404, {"error": "introuvable"})

        def do_POST(self):
            body = self._body()
            if body is None:
                return self._send(400, {"error": "JSON invalide"})
            on = body.get("on")
            if on is not None and not isinstance(on, bool):
                return self._send(400, {"error": "'on' doit être true ou false"})

            parts = self.path.strip("/").split("/")
            if parts[:2] == ["api", "all"] and len(parts) == 2:
                if on is None:
                    return self._send(400, {"error": "'on' requis"})
                outlets.set_all(on)
                return self._send(200, outlets.state())
            if parts[:2] == ["api", "outlet"] and len(parts) == 3 and parts[2].isdigit():
                idx = int(parts[2]) - 1
                if not 0 <= idx < len(outlets.relays):
                    return self._send(404, {"error": "prise inconnue"})
                outlets.set(idx, on)  # on=None -> bascule
                return self._send(200, outlets.state())
            self._send(404, {"error": "introuvable"})

    return Handler


def main():
    config = json.loads(CONFIG_PATH.read_text())
    outlets = Outlets(config)
    port = int(os.environ.get("PORT", config.get("port", 8080)))
    httpd = ThreadingHTTPServer(("0.0.0.0", port), make_handler(outlets))
    mode = "SIMULATION" if outlets.mock else "GPIO"
    print(f"[prises] {mode} - http://0.0.0.0:{port}", file=sys.stderr)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
