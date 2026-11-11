#!/usr/bin/env bash
# À lancer SUR le Raspberry, depuis ce dossier : sudo ./install.sh
set -euo pipefail
cd "$(dirname "$0")"

apt-get install -y python3-gpiozero >/dev/null 2>&1 || true

mkdir -p /opt/prises/static
cp server.py /opt/prises/
cp static/index.html /opt/prises/static/
# Ne pas écraser une config déjà adaptée
[ -f /opt/prises/config.json ] || cp config.json /opt/prises/

cp prises.service /etc/systemd/system/prises.service
systemctl daemon-reload
systemctl enable --now prises.service
systemctl restart prises.service

echo "OK. Adresses du Raspberry :"
hostname -I
echo "Depuis l'ordinateur : http://$(hostname).local:8080  (ou http://<IP>:8080)"
