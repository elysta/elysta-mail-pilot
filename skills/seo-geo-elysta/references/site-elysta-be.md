# Fiche site — elysta.be (et elysta.fr, elysta.nl, elysta.de)

État relevé le 20/11/2026 par lecture publique du site et de Search Console. À mettre à jour à chaque trimestre.

## Identité
- Marque : Elysta — mobilier enfant en bois (multiplex de bouleau), dessiné et fabriqué à la commande dans
  l'atelier d'Andenne (Coutisse). Fabricant, pas revendeur.
- Société : SEMEM Art & Design SRL, Chaussée de Ciney 372, 5300 Andenne. TVA BE0695884136. +32 85 55 91 20, info@elysta.be.
- Marque sœur à distinguer : Elysta Atelier (menuiserie sur mesure, elysta-atelier.be). Même adresse, même téléphone.
- Gammes : tours d'observation (dès 185 € TVAC), lits Montessori et cabanes (dès 325 €), rangements et bibliothèques
  (dès 115 €), tables et chaises (dès 139 €), modules de motricité (dès 80 €), mobilier crèches et écoles (sur devis),
  sur mesure enfant. Livraison BE 4,90 € (offerte dès 175 €), FR/NL 14,90 € (dès 400 €), DE 19,90 €. Retours 14 jours.
  Avis : 4,6/5 sur 21 avis Trustpilot (selon llms.txt — à vérifier avant republication).

## Cible commerciale (filtre de priorisation)
1. **Crèches, écoles, collectivités** : projets à fort panier, devis, prescripteurs (ONE, Opgroeien, psychomotriciens).
   Pages clés : `/mobilier-creche-ecole-belgique/`, `/guides/amenager-creche-ecole-belgique/`,
   `/guides/equiper-ecole-maternelle-belgique/`, `/conseils/meubles-creche-durable/`, réalisations crèche
   (`/realisations/module-psychomotricite-creche`, `/arbre-jeu-motricite-creche`, `/vestiaire-creche-sur-mesure`,
   `/meuble-soleil-rangements-creche`, `/coin-lecture-rangements-ecole`).
2. Parents (B2C, volume) : tours d'observation, lits Montessori.
3. Sur mesure enfant et horeca (espaces de jeu).

## Technique
- Astro 5.18 statique, nginx auto-hébergé. HTML complet servi ; ETag + Last-Modified présents, `Cache-Control: no-store`.
- robots.txt : tout autorisé sauf `/admin-photos`, `/panier`, `/commande-confirmee`, `/commande-annulee`. Aucun robot IA bloqué.
- Sitemap : `sitemap-index.xml` → `sitemap-0.xml`, 166 URLs (dont ~60 en `/nl/`).
- llms.txt présent, factuel (faits, gamme, prix, guides).
- Compte client sur Odoo (`elysta.odoo.com/my`, lien nofollow) ; paiement Stripe.
- Données structurées : accueil = Organization, WebSite, FAQPage (8 Q/R), PostalAddress, ContactPoint, horaires ;
  fiche produit = Product, Offer, OfferShippingDetails (5 pays), MerchantReturnPolicy, Brand, BreadcrumbList, FAQPage.
- **Multilingue / multi-pays** : hreflang `fr-BE` (elysta.be), `nl-BE` (elysta.be/nl/), `fr-FR` (elysta.fr),
  `nl-NL` (elysta.nl), `de-DE` (elysta.de), `x-default` → elysta.be. Chaque domaine pays a sa propre canonical et sa
  propriété GSC.

## Volumes (GSC, 18/08-16/11/2026)
Belgique 1 067 clics / 45 316 impressions / position 7,2 ; France 48 clics (986 impr., pos. 13,8) ; Pays-Bas 8 clics
(619 impr., pos. 14,8) ; Allemagne 9 ; Luxembourg 9 ; Suisse 5. GA4 : `properties/399724581`.

## Sources de trafic (GA4, 90 jours au 19/11/2026) — FAIT
| Source | Sessions | Événements clés |
|---|---|---|
| google | 697 | 18 |
| (direct) | 250 | 10 |
| **chatgpt.com** | **185** (+ 2 Gemini) | **1** |
| stripe (retour paiement) | 20 | 2 |
| bing | 4 | 0 |
Événements clés du site : `purchase` 14, `contact` 9, `generate_lead` 8.
**ChatGPT est la 3e source du site (≈ 16 % des sessions)**, avec un taux d'engagement correct (129/187) mais 1 seul
événement clé. Pages d'arrivée depuis ChatGPT : accueil 25, `/lits-montessori` 22, tour d'observation girafe 14,
`/tours-observation` 14, lit 60×120 9, `/lit-cabane` 7, `/nl/mobilier-creche-ecole-belgique` 6, `/mobilier-creche-ecole-belgique` 4.
→ Le GEO n'est pas théorique ici : ces pages sont lues et recommandées. Priorité : vérifier que ce que ChatGPT dit
d'Elysta est exact (T28) et que ces pages d'arrivée mènent à l'achat ou au devis (chemin de conversion, pas SEO).

## Anciennes URLs Odoo (testé le 20/11/2026)
`/shop` → 301 `/mobilier-enfant/`, `/contactus` → 301 `/contact/`, `/shop/cart` → 301 `/panier/` : la migration a été
traitée en partie. `/shop/category/…`, `/blog`, `/aboutus`, `/fr_BE/shop` → 404. T59 reste utile mais en contrôle
(croiser avec le rapport Liens de GSC, qui n'est pas exposé par l'API : à lire dans l'interface).

## Points d'attention relevés (à confirmer par l'agent)
1. **hreflang à 5 versions sur 4 domaines** (T64, P1) : vérifier la réciprocité sur les pages profondes, pas seulement l'accueil.
2. **Double néerlandais** : `elysta.be/nl/` (nl-BE) et `elysta.nl` (nl-NL). Si les contenus sont quasi identiques, ce
   sont deux versions en concurrence ; l'écart doit porter au moins sur la livraison/prix (c'est le cas : 14,90 € NL vs BE)
   et idéalement le vocabulaire flamand (T65).
3. **Slugs français dans la version néerlandaise** (ex. `/nl/produit/armoire-murale-1-2-3-soleil/`) : signal de langue
   mixte ; à traiter si la version NL a une valeur commerciale (sinon parking).
4. **Ancien site Odoo** : redirections principales en place (voir ci-dessus) ; reste à vérifier les pages anciennes qui ont des liens externes → T59 (P2).
5. **Cannibalisation potentielle sur « tour d'observation »** : catégorie, deux guides, un conseil, un comparatif (T08/T09).
6. **Note Trustpilot** : ne pas la baliser en `aggregateRating` sans vérifier la conformité (T52).
7. Bing Webmaster Tools : enregistrement à vérifier (T32).

## Priorités P1 (premier trimestre)
| Ordre | Technique | Pourquoi ici | Effet carnet |
|---|---|---|---|
| 1 | T31 attribution déclarative sur le formulaire de devis crèche | relier IA/recherche aux devis | fort |
| 2 | T57 cartographie ONE / Opgroeien / Iriscare | double usage SEO + prospection crèches | fort |
| 3 | T28 + T30 sur le trafic ChatGPT (185 sessions/90 j, 1 conversion) : exactitude des réponses, pages d'arrivée | 3e source du site | moyen à fort |
| 4 | T64 contrôle hreflang des 5 versions | erreurs silencieuses | moyen |
| 5 | T39 + T40 sur la page crèches/écoles (questions des mails de devis + faits atelier) | page qui mène aux devis à fort panier | fort |
| 6 | T01-T04, T14, T16, T30 | socle de mesure mensuel | indirect |
| 7 | T28 panel IA (20 prompts crèche + parents, un assistant) | savoir si Elysta est citée et si les faits sont justes | moyen |
| 8 | T20 SERP de la grappe « mobilier crèche » | savoir si la requête est jouable | moyen |
| 9 | T61/T62 : pas de seconde fiche GBP tant que les deux marques partagent atelier, équipe et téléphone (voir fiche Atelier) | local | faible |
