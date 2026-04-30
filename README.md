# Elysta Mail Pilot

Pack local minimal pour tester un assistant mail Elysta / Elysta Atelier.

## Contenu
- `backend/` : API Node/TypeScript pour IMAP/SMTP OVH, analyse, inbox, brouillons et envoi validé.
- `frontend/` : interface React/Vite simple pour tester le flux.

## Lancer le backend
```bash
cd backend
cp .env.example .env
# remplace CHANGE_ME par le vrai mot de passe / secret applicatif
npm install
npm run dev
```

Test rapide :
```bash
curl http://localhost:8787/health
```

## Lancer le frontend
```bash
cd frontend
npm install
npm run dev
```

Puis ouvre l’URL Vite affichée, en général :
```text
http://localhost:5173
```

## Ordre conseillé
1. Changer les mots de passe déjà exposés auparavant.
2. Tester `/health`.
3. Tester la connexion dans l’interface.
4. Charger la boîte.
5. Analyser un mail.
6. Créer un brouillon.

## Limites actuelles
- Le backend crée un pseudo-brouillon via SMTP préfixé `[BROUILLON À VALIDER]`.
- Ce n’est pas encore un vrai draft IMAP natif.
- L’analyse est heuristique, suffisante pour MVP, pas pour autopilote final.
