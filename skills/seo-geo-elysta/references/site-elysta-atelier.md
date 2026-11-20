# Fiche site — elysta-atelier.be

État relevé le 20/11/2026 par lecture publique du site et de Search Console. À mettre à jour à chaque trimestre.

## Identité
- Marque : Elysta Atelier — menuiserie intérieure sur mesure : escaliers, cuisines, dressings, bibliothèques,
  bureaux, meubles TV, agencements professionnels (bureaux, horeca). Conçu, fabriqué et posé en interne, sans
  sous-traitance ; CNC, cabine de peinture > 70 m².
- Signe distinctif (citable) : chaque meuble est **monté à blanc à l'atelier** avant la pose ; fil du bois suivi
  d'une façade à l'autre.
- Société : SEMEM Art & Design SRL, Chaussée de Ciney 372, 5300 Andenne (Coutisse). etude@elysta-atelier.be, +32 85 55 91 20.
- Horaires atelier : lun-jeu 8 h 30-17 h, ven 8 h 30-15 h.
- Zone : province de Namur (Andenne, Namur, Ciney), Huy, Liège, Brabant wallon, Bruxelles, Wallonie.
- Références pros citées : bureaux d'ALIX (Auderghem), espaces de jeu du restaurant Bo Moments (Enghien).
- Marque sœur : Elysta (mobilier enfant, elysta.be). Même adresse, même téléphone.

## Cible commerciale (filtre de priorisation)
1. Particuliers avec projet > 15 k€ (cuisine, escalier, aménagement complet, dressing walk-in).
2. **Architectes, architectes d'intérieur, prescripteurs** et agencement professionnel (bureaux, horeca) — multi-projets.
3. Petits projets isolés : à ne pas sur-attirer (le site a déjà une page `/pourquoi-nous-refusons-certains-projets/`, bon filtre).

Pages qui mènent au carnet : `/professionnels/`, `/agencement-bureaux-sur-mesure/`, `/agencement-restaurant-horeca-sur-mesure/`,
`/cuisines/`, `/escaliers/`, `/dressing-sur-mesure/`, `/budget/`, les trois pages « combien coûte… », `/realisations/*` (17 réalisations).

## Technique
- Astro 5.18 statique, nginx auto-hébergé, ETag présents. robots.txt : tout autorisé. Sitemap : 59 URLs. llms.txt présent, factuel.
- Données structurées : GeneralContractor, Organization, Person, Brand, Place ×10 (zones), FAQPage, horaires.
- Pas de version néerlandaise (alors que Bruxelles est dans la zone) — décision à prendre avec T65 si la demande existe.

## Volumes (GSC, 18/08-16/11/2026)
Belgique 181 clics / 12 407 impressions / **position moyenne 20,7** ; France 3 clics. ≈ 60 clics/mois.
GA4 : `properties/420310581` (une autre propriété `543658770` existe sous le compte Google Ads — clarifier laquelle porte les conversions).
À ce volume, presque rien n'est mesurable statistiquement : l'Atelier se pilote surtout par T31 (comment les clients
nous ont connus), T28 (présence dans les réponses IA) et les contacts qualifiés.

## Points d'attention relevés
1. **12 pages villes** : `escalier-sur-mesure-{andenne, brabant-wallon, bruxelles, huy, liege, namur}` et
   `menuisier-sur-mesure-{mêmes 6}`. Risque doorway (T63, **P1**) et cannibalisation avec `/escaliers/` et
   `/menuiserie-interieure-sur-mesure-belgique/` (T08). Audit de substitution page par page avant toute nouvelle page villes.
2. Position moyenne 20,7 : la majorité des impressions sont en page 2-3. Prioriser quelques requêtes à forte valeur
   (T20) plutôt que d'élargir.
3. Ambiguïté de marque « Elysta » avec le mobilier enfant (T35) : chaque page clé doit dire « Elysta Atelier, menuiserie sur mesure ».
4. Ancien site Odoo éventuel : T59.
5. Bing Webmaster Tools à vérifier (T32) : les architectes et pros cherchent sur poste fixe.

## Priorités P1 (premier trimestre)
| Ordre | Technique | Pourquoi ici | Effet carnet |
|---|---|---|---|
| 1 | T63 + T08 audit des 12 pages villes | risque de sanction + pages qui se concurrencent | fort (protection) |
| 2 | T31 attribution déclarative sur le formulaire d'étude + premier appel | savoir d'où viennent les projets > 15 k€ | fort |
| 3 | T28 panel IA (prompts particuliers + architectes, zone Namur-Bruxelles) | être recommandé quand on demande « menuisier sur mesure » à un assistant | moyen à fort |
| 4 | T33/T34/T40 sur `/professionnels/` et les pages « combien coûte » (fourchettes réelles datées, montage à blanc) | pages de décision, faits citables | fort |
| 5 | T20 SERP grappes escalier / cuisine / agencement bureau Bruxelles | jouable ou pas | moyen |
| 6 | T61/T62 fiche GBP hybride + NAP (après décision une adresse/deux marques) | local Andenne-Namur-Huy | moyen |
| 7 | T01-T04, T14, T16, T30 | socle de mesure | indirect |
| 8 | T57 version architectes (registres, transposition non sourcée) | prescripteurs multi-projets | moyen, à valider |
