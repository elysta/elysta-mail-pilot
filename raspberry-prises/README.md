# Prises du Raspberry (Stan)

Page web pour allumer et éteindre les 4 prises branchées au Raspberry Pi
(via une carte relais 4 canaux sur le GPIO), depuis l'ordinateur de Stan
relié en Ethernet. Il n'y a rien à installer sur l'ordinateur : il suffit d'un navigateur.

## 1. Vérifier le câblage (à faire en premier)

Par défaut, le programme suppose ceci :

| Prise   | GPIO (BCM) | Broche physique |
|---------|-----------:|----------------:|
| Prise 1 | 17         | 11              |
| Prise 2 | 27         | 13              |
| Prise 3 | 22         | 15              |
| Prise 4 | 23         | 16              |

La carte relais est supposée **active à l'état bas** (`"active_high": false`), ce qui est le cas de la
plupart des modules 4 relais vendus pour Raspberry.

Si le câblage est différent, modifie `config.json` : numéros GPIO, noms des prises
(par ex. « Lampe », « Pompe ») et `active_high`.
**Symptôme d'une logique inversée** : tout est allumé quand la page affiche « Éteinte ».
Dans ce cas, passe `active_high` à `true`.

## 2. Installer sur le Raspberry

Copie ce dossier sur le Raspberry (clé USB ou `scp`), puis :

```bash
cd raspberry-prises
chmod +x install.sh
sudo ./install.sh
```

Le service démarre tout seul à chaque allumage du Raspberry. L'état des prises
est mémorisé et restauré après une coupure (option `restore_state_on_boot`).

Commandes utiles :

```bash
sudo systemctl status prises      # le service tourne-t-il ?
sudo journalctl -u prises -f      # journaux en direct
sudo nano /opt/prises/config.json && sudo systemctl restart prises
```

## 3. Connexion Ethernet ordinateur ↔ Raspberry

**Cas A : les deux appareils sont branchés sur la même box ou le même switch.**
Ouvre `http://raspberrypi.local:8080` (remplace `raspberrypi` par le nom du Pi
s'il a été changé). Si ça ne répond pas, utilise l'IP affichée par `hostname -I`.

**Cas B : câble direct entre l'ordinateur et le Raspberry, sans box.**
Il faut une IP fixe des deux côtés :

- Sur le Raspberry (Raspberry Pi OS Bookworm) :
  ```bash
  sudo nmcli con mod "Wired connection 1" ipv4.method manual ipv4.addresses 192.168.50.2/24
  sudo nmcli con up "Wired connection 1"
  ```
- Sur l'ordinateur, carte Ethernet : IP `192.168.50.1`, masque `255.255.255.0`, pas de passerelle.
  (Windows : Paramètres → Réseau → Ethernet → Attribution IP → Manuelle.)
- Puis ouvrir `http://192.168.50.2:8080`.

Conseil : ajoute la page aux favoris (ou crée un raccourci sur le bureau) pour que Stan
y accède en un clic.

## 4. Tester sans Raspberry

```bash
MOCK=1 python3 server.py
# puis http://localhost:8080
```

## API (pour automatiser)

- `GET  /api/state` : état des 4 prises
- `POST /api/outlet/<1-4>` avec `{"on": true|false}` ; sans corps, la prise bascule
- `POST /api/all` avec `{"on": true|false}`

```bash
curl -X POST http://192.168.50.2:8080/api/outlet/1 -H 'Content-Type: application/json' -d '{"on":true}'
```

## Sécurité

Il n'y a pas de mot de passe : toute personne présente sur le même réseau peut piloter les prises.
Avec un câble direct (cas B), seul l'ordinateur de Stan y a accès. Si le Pi est branché sur un
réseau partagé, il faut ajouter une authentification.
