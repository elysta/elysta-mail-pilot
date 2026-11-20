# Catalogue fusionné des techniques SEO / GEO — Elysta

Fusion de trois recherches menées le 20/11/2026 sur le même prompt :
**G** = Gemini (47 techniques), **C** = ChatGPT (46), **Cl** = Claude (64). Les doublons ont été fusionnés
par **mécanisme** et non par nom. Le détail de la fusion est dans `fusion-trois-rapports.md`.

## Lire ce catalogue

- **Priorité** : P1 = à faire dans les 3 mois, P2 = quand P1 est en place, P3 = parking (ne pas lancer
  sans raison nouvelle), X = écarté pour ces sites (raison donnée).
- **BE** = elysta.be (et ses domaines pays) ; **AT** = elysta-atelier.be.
- **Statut** = DOC (documenté officiellement), REX (retour d'expérience publié), HYP (hypothèse sur un
  algorithme propriétaire), EXP (expérimental). Quand le mécanisme est documenté mais l'usage proposé ne l'est
  pas, c'est écrit.
- Les seuils marqués *(convention)* ne viennent d'aucune source : ils rendent la méthode exécutable et sont à
  recalibrer après 2-3 cycles.
- Numérotation T01-T65 conservée pour la stabilité des renvois ; T11 (fusionnée dans T04), T25 (dans T40),
  T36 (dans T32) et T54 (`indexifembedded`, écartée) n'ont pas de fiche propre.
- Les fiches P1 ont un protocole complet. Les P2 ont un protocole court. Les P3/X ont une ligne.

## Tableau de synthèse

| ID | Technique (par mécanisme) | Cat. | Statut | BE | AT | Sources |
|---|---|---|---|---|---|---|
| T01 | Archiver mensuellement GSC par API (et activer l'export BigQuery) pour dépasser 16 mois et 1 000 lignes | Mesure | DOC | P1 | P1 | Cl2, Cl9, G5 |
| T02 | Mesurer la part cachée (somme des lignes vs total) et corriger les dénominateurs | Mesure | DOC | P1 | P1 | Cl1, G1, C4 |
| T03 | Séparer marque / hors-marque (filtre `brandedClassification`, sinon regex versionnée) | Mesure | DOC | P1 | P1 | Cl1, G2, G17 |
| T04 | Décomposer une variation en impressions / position / CTR à position constante | Diagnostic | DOC+REX | P1 | P1 | Cl15, G3, C9 |
| T05 | Comparer à N-1 même période ; STL seulement avec ≥ 24 mois et volume suffisant | Diagnostic | REX | P2 | P3 | Cl9, C6 |
| T06 | Tenir un journal d'événements (actions site, salons, congés, mises à jour Google) | Mesure | REX | P1 | P1 | Cl9 |
| T07 | Mesurer un effet par lot traité vs lot témoin, conclusion « indicative » | Mesure | REX | P1 | P1 | Cl12, Cl43, C7 |
| T08 | Détecter la cannibalisation par séries hebdo de parts d'impressions entre URLs | Diagnostic | REX | P2 | P1 | Cl5, Cl3, G8, C1, C2, C13 |
| T09 | Tester l'intention par recouvrement des top 10 (clustering hard/soft) | Diagnostic | REX | P2 | P2 | Cl6 |
| T10 | Repérer les CTR anormaux par rapport à la médiane du site par tranche de position | Diagnostic | REX | P2 | P3 | Cl4, G9, C3 |
| T12 | Décider maj / refonte / fusion / suppression d'une page sur seuils | Éditorial | REX | P2 | P2 | Cl7, Cl43, G14, C8, C31 |
| T13 | Segmenter par gabarit et comparer le taux de pages actives | Diagnostic | REX | P2 | P3 | Cl8, C5 |
| T14 | Suivre l'entonnoir soumis → découvert → exploré → indexé (API d'inspection) | Technique | DOC | P1 | P1 | Cl16, Cl52, C11, C38, G12 |
| T15 | Analyser les logs nginx : Googlebot vérifié (rDNS), codes, URLs jamais explorées | Technique | DOC+REX | P2 | P2 | Cl14, G11, G12, C10, C12 |
| T16 | Compter dans les logs les agents IA « utilisateur » vérifiés par IP, top URLs | GEO | EXP | P1 | P1 | Cl36, G26, G27 |
| T17 | Reconstituer l'inventaire d'un concurrent via robots.txt / sitemaps | Concurrence | DOC | P2 | P2 | Cl19 |
| T18 | Diff daté de l'inventaire concurrent (archives CDX + relevés propres) | Concurrence | EXP | P3 | P3 | Cl20 |
| T19 | PageRank interne d'un concurrent (maillage déclaré) | Concurrence | REX | P3 | P3 | Cl21 |
| T20 | Coder une SERP par type d'acteur × format et compter l'espace attaquable | Concurrence | REX | P1 | P1 | Cl26, C17, C18, C21 |
| T21 | Mesurer la concentration de visibilité d'un concurrent | Concurrence | EXP | P3 | P3 | Cl24, C19 |
| T22 | Liens morts du profil d'un concurrent | Concurrence | REX | P3 | P3 | Cl25, C20 |
| T23 | Lire la taxonomie de facettes d'un concurrent | Concurrence | EXP | P3 | X | Cl23 |
| T24 | Lire les recherches internes indexées d'un concurrent | Concurrence | REX | X | X | Cl22 |
| T26 | Arbitrer les robots IA : entraînement vs recherche vs extrait | GEO | DOC | P1 | P1 | Cl27, Cl28, G28 |
| T27 | Mesurer l'usage réel de llms.txt dans les logs | GEO | REX | P2 | P2 | Cl29 |
| T28 | Panel de prompts répété : prévalence, intervalle, justesse des faits, étape de perte | GEO | EXP | P1 | P1 | Cl34, G20, G24, G25, C22-C24 |
| T29 | Identifier localement les sources tierces surreprésentées dans les réponses IA | GEO | REX | P2 | P2 | Cl33, C27 |
| T30 | Canal « Assistants IA » dans GA4 + inventaire des liens sans référent | GEO | REX/DOC | P1 | P1 | Cl35, G29, C25 |
| T31 | Attribution déclarative (formulaire, appel) : « ChatGPT / Perplexity / … » | GEO | REX | P1 | P1 | G30 |
| T32 | Exploiter Bing Webmaster Tools AI Performance (citations, requêtes d'ancrage) | GEO | DOC* | P1 | P1 | G18, G31, G32, C26 |
| T33 | Écrire citable : sources nommées, chiffres datés avec méthode | GEO | REX | P1 | P1 | Cl30, G21 |
| T34 | Écrire en passages autonomes, réponse en tête de section | GEO | DOC+HYP | P1 | P1 | Cl31, Cl44, G22, G23, C32 |
| T35 | Stabiliser l'entité : page de référence, Organization/vatID/sameAs, faits concordants partout | GEO | DOC+HYP | P1 | P1 | Cl32, Cl37, Cl51, G37, C33, C34 |
| T37 | Isoler les requêtes « écrites par des agents » dans GSC | Mesure | REX (1 source) | P3 | P3 | G6 |
| T38 | Fraîcheur réelle : pas de date cosmétique, contenu réellement mis à jour | Éditorial | DOC | P2 | P2 | G36, Cl45 |
| T39 | Extraire les questions réelles (mails devis/SAV, recherche interne, GSC interrogatives) | Éditorial | REX | P1 | P1 | Cl42, G34, C30 |
| T40 | Lister les faits atomiques d'un sujet et exiger ≥ 3 faits propres à l'atelier | Éditorial | EXP | P1 | P1 | Cl39, G35, G19, C29, C35 |
| T41 | Injecter les termes de requêtes absents du texte (vocabulaire client) | Éditorial | REX | P2 | P2 | G33, C34 |
| T42 | Publier une donnée que seul le fabricant possède (actif citable) | Autorité | REX | P2 | P2 | Cl58, G21 |
| T43 | Mesurer la saillance d'entité d'une page (NLP) | Éditorial | EXP | P3 | P3 | Cl38 |
| T44 | Décomposer une requête en sous-requêtes et couvrir par sections (verrou anti-usine) | Éditorial | HYP | P2 | P2 | Cl40 |
| T45 | Arborescence en grappes / cocon | Structure | HYP | P3 | P3 | Cl41, G39 |
| T46 | Porte qualité à 12 contrôles avant publication | Éditorial | DOC | P1 | P1 | Cl45 |
| T47 | Cohérence de désignation produit entre texte, images, schema | Éditorial | DOC | P2 | P3 | G37, Cl54 |
| T48 | Graphe de liens internes : orphelines, profondeur, pages sous-alimentées | Technique | HYP | P2 | P2 | Cl46, G38, G41, C36, C37 |
| T49 | Contrôler canonical / sitemap / liens internes / indexation | Technique | DOC | P2 | P2 | C38, Cl48 |
| T50 | Core Web Vitals en données terrain, arrêt au seuil « bon » | Technique | DOC | P2 | P2 | Cl53, C39 |
| T51 | Images découvrables, nommées, décrites, image principale désignée | Technique | DOC | P2 | P2 | Cl54, C40 |
| T52 | Données structurées conformes et reliées par @id | Technique | DOC+HYP | P2 | P2 | Cl51 |
| T53 | ETag / 304 pour les robots | Technique | DOC | P3 | P3 | Cl49, G36 |
| T55 | Contrôler HTML brut vs rendu | Technique | REX | P3 | P3 | G42, G13 |
| T56 | Suivre impressions marque vs domaines référents (rupture de pente) | Autorité | HYP | P2 | P2 | Cl55, G45, G17 |
| T57 | Cartographier l'autorité via registres officiels (ONE, Opgroeien, Iriscare, marchés publics) | Autorité | EXP | P1 | P2 | Cl56 |
| T58 | Convertir les mentions non liées en liens (≤ 10 demandes/mois) | Autorité | REX | P2 | P2 | Cl57, C41, C42 |
| T59 | Rétablir les URLs propres en 404 qui reçoivent encore des liens | Autorité | DOC | P1 | P1 | Cl59 |
| T60 | Susciter des retours d'usage tiers (crèches, parents, architectes) | Autorité/GEO | EXP | P2 | P2 | G43, Cl33 |
| T61 | Fiche Google Business Profile : bon régime, complétude, avis | Local | DOC | P1 | P1 | Cl60, G46, C44 |
| T62 | Aligner nom / adresse / téléphone sur toutes les bases | Local | DOC+HYP | P1 | P1 | Cl61, C33, C44 |
| T63 | Pages géographiques : test de substitution et ≥ 3 éléments propres | Local | DOC | P2 | **P1** | Cl62 |
| T64 | hreflang réciproques et contrôlés par crawl | Multilingue | DOC | **P1** | X | Cl63, G46, C45 |
| T65 | Décider une version linguistique par divergence lexicale et volume | Multilingue | EXP | P2 | P3 | Cl64, C46 |

\* T32 : l'existence du rapport AI Performance de Bing est rapportée par Gemini avec des sources datées 2026 que
nous n'avons pas vérifiées. À confirmer en ouvrant Bing Webmaster Tools.

### Écartés pour ces deux sites (X) — ne pas relancer sans fait nouveau

| Technique | Sources | Raison |
|---|---|---|
| Split test SEO par cohortes d'URLs (y compris maillage) | Cl10, Cl47, G10, C7 | Il faut ~15 000 clics par gabarit pendant le test pour détecter +10 %. BE ≈ 390 clics/mois au total. Puissance nulle. |
| CausalImpact / modèle bayésien structurel | Cl11, G10 | Exige 36 mois d'historique et un témoin validé ; mauvais témoin = faux positifs de 20 % (évaluation Oncrawl 2025). |
| Régression segmentée / ITS, datation de rupture | Cl13 | ≥ 50 clics par point de mesure requis ; balayage de dates = faux positifs. |
| Google Trends comme régresseur de demande | Cl17 | Indice quasi nul sur la niche Montessori BE ; non validé. |
| Yandex (SQI, recrawl API, vitesse d'exploration, critères commerciaux) | G15, G47, Cl18, G44 | Aucun trafic Yandex visé. Les critères « complétude commerciale » de G44 sont repris comme bon sens UX dans T35/T61, pas comme facteur. |
| Facettes / paramètres Odoo | G40, Cl48 (partie facettes) | Les sites sont en Astro statique ; Odoo ne sert que le compte client (`elysta.odoo.com/my`, nofollow). |
| Modélisation NavBoost / signaux Chrome | G16 | Documentation fuitée, poids inconnus. Utilisable comme grille de lecture UX, jamais comme objectif. |
| WDF*IDF comme densité cible | G19 | Pousse au bourrage. Seule l'idée « quels sous-thèmes le lecteur attend » survit, dans T40. |
| Recherches internes indexées d'un concurrent | Cl22 | Aucun concurrent de niche n'a ce dispositif ; biais d'audience généraliste. |
| `indexifembedded` | Cl50 | Aucun contenu servi en iframe sur les sites. |
| Ratio requêtes IA dans GSC par regex | G6 | Une seule source, observation sur un site éditorial ; garder en P3 (T37). |

---

## A. Socle de mesure

### T01 — Archiver GSC mensuellement — P1 BE / P1 AT — DOC
**Pourquoi** : GSC efface après ~16 mois et plafonne l'interface à 1 000 lignes ; l'API pagine (`rowLimit`
25 000, `startRow`) jusqu'à ~50 000 lignes/jour/site. Sans archive, aucune comparaison N-1 propre ni saisonnalité.
**Protocole**
1. Le 5 de chaque mois, extraire le mois M-1 clos, `dataState: final`, dimensions `date, query, page, country, device`,
   type `web`, pour chaque propriété (`elysta.be`, `.fr`, `.nl`, `.de`, `elysta-atelier.be`).
2. Stocker sans écraser (fichier Parquet/CSV daté, ou table Hub `seo_gsc_daily` si Erwan valide).
3. Recommandation à Erwan : activer l'**export BigQuery** une fois (non rétroactif ; c'est le seul moyen de garder
   les métriques des requêtes anonymisées). Coût estimé faible à ce volume — non vérifié, à mesurer.
**Abandon** : jamais (coût quasi nul). L'export BigQuery peut être désactivé si, après 3 mois, il n'apporte
pas > 1,5× de requêtes distinctes par rapport à l'API.

### T02 — Part cachée — P1 — DOC
**Pourquoi** : les requêtes rares sont anonymisées : absentes des lignes, présentes dans les totaux ; tout filtre
`query` les retire aussi des totaux (Google, « Performance data deep dive », 19/10/2022). Sur un site de niche,
la part cachée peut être majoritaire.
**Protocole** : total du site (aucune dimension `query`) vs somme des lignes `query` sur 90 jours.
`part_cachee = 1 − Σlignes / total`.
- > 0,30 → interdire tout « % du trafic » calculé sur les requêtes ; raisonner **par page** et en évolution d'une ligne avec elle-même.
- < 0,10 → ratios par requête utilisables (±10 %).
Consigner la valeur chaque mois ; une hausse brutale est un signal en soi.

### T03 — Marque / hors-marque — P1 — DOC
**Protocole** : filtre natif `brandedClassification` (API, données depuis le 21/02/2026, propriétés domaine
uniquement, incombinable avec un filtre `query`). Sinon regex versionnée :
- BE : `elysta|elista|elysta\.be|tour.*elysta|woobista|twetov|transysta|ely ?box` (compléter avec les noms de gamme).
- AT : `elysta atelier|elysta-atelier|elysta menuiserie|elysta andenne|semem`.
Attention : « elysta » sert aux deux marques → une requête « elysta » sur AT n'est pas une preuve de notoriété Atelier.
Ne jamais additionner un filtre « contient » et « ne contient pas » pour retrouver le total (non additif).

### T04 — Décomposer une variation — P1 — DOC+REX
**Protocole** : pour le segment concerné, comparer période vs période précédente de même longueur (hors 3 derniers jours) :
Δimpressions, Δposition, ΔCTR, et ΔCTR par rapport à la médiane du site pour la même tranche de position.
Règles *(convention)* : |Δpos| < 0,5 et Δimpr < −20 % → demande/affichage ; Δpos < −1,5 et impr stables → classement ;
impr et pos stables, CTR < médiane −20 % relatif → SERP changée (observer la SERP 3 fois sur 2 semaines avant de conclure) ;
impr > +20 % et CTR ↓ → élargissement, pas une baisse.
Rappel : deux URLs du site sur la même requête = **une** impression au niveau propriété ; la position propriété
n'est pas la position page. Effet mesuré à retenir : un résumé IA en position zéro a coupé les clics organiques
de ~40 % à position inchangée (étude randomisée, 1 065 utilisateurs — **référence exacte non retrouvée, ne pas citer
dans un document externe**).

### T05 — Saisonnalité — P2 BE / P3 AT — REX
Comparer à la même période N-1 (pas au mois précédent). Décomposition STL / Prophet seulement avec ≥ 24 mois
archivés et ≥ quelques centaines d'impressions par semaine dans le segment. Saisons connues BE : Saint-Nicolas
(page `/saint-nicolas/`), fin d'année, rentrée de septembre (crèches, écoles), budgets publics.

### T06 — Journal d'événements — P1 — REX
Fichier ou table : date, site, type (mise en ligne, refonte, prix, rupture, salon, campagne, congés atelier,
mise à jour Google confirmée sur le Search Status Dashboard), URL concernée. Seul un humain le remplit pour les
événements hors site. Sans lui, toute rupture est inattribuable.

### T07 — Lot traité vs lot témoin — P1 — REX
Puisque les tests formels sont exclus (voir écartés), toute action éditoriale se mesure ainsi :
1. Avant l'action, désigner un lot traité et un lot témoin de pages comparables (même gabarit, trafic de départ proche).
2. Relever clics/impressions des deux lots sur les 8 semaines précédentes (vérifier qu'ils évoluaient en parallèle).
3. Mesurer à 60 et 90 jours : (traité_après/traité_avant) − (témoin_après/témoin_avant).
4. Rapporter le résultat comme **indicatif**, jamais comme causal. Sous ~500 clics par lot et par période,
   seul un effet > 40 % est lisible.

---

## B. Diagnostic des pages et du site

### T08 — Cannibalisation — P2 BE / **P1 AT** — REX
**Pourquoi AT en P1** : l'Atelier a `/escaliers/` + 6 pages `escalier-sur-mesure-{ville}` + 6 pages
`menuisier-sur-mesure-{ville}` + `/menuiserie-interieure-sur-mesure-belgique/` : configuration typique de pages
qui se relaient sur les mêmes requêtes. BE : `/tours-observation/` vs `/guides/tour-observation-montessori/` vs
`/conseils/choisir-tour-observation/` vs `/guides/tour-observation-comparatif/` (deux intentions possibles, à vérifier).
**Protocole**
1. 26 semaines, `date, query, page`, hors marque. Regrouper les variantes techniques (slash, paramètres).
2. Pour chaque requête ≥ 100 impressions/mois *(convention ; sur AT descendre à 30)* : part d'impressions par URL et par semaine.
3. `part_max_moyenne ≥ 0,85` → normal. Sinon, et ≥ 3 changements d'URL dominante → candidat.
4. Confirmer : position propriété > meilleure position hebdo de chaque URL + 2 rangs.
5. Décider : même intention + même gabarit → fusion (301) ; intentions distinctes → différencier les deux pages
   et le maillage (T09 avant de fusionner) ; jamais de 301 sans validation d'Erwan.
**Abandon** : si 3 consolidations n'augmentent pas les clics cumulés de la requête de > 10 % à 12 semaines.
Variante EXP (Cl3) : comparer `aggregationType byPage` vs `byProperty` pour repérer les requêtes où le site
affiche plusieurs URLs simultanément — non publiée, à valider sur 20 requêtes.

### T09 — Intention par recouvrement de SERP — P2 — REX
Pour trancher « une page ou deux » : relever le top 10 google.be en français (pas google.fr) de chaque requête,
normaliser les URLs, regrouper en mode *hard* niveau 3 puis 5 (méthode Topvisor). Même cluster hard 5 → une page ;
séparées en hard 3 → deux pages ; entre les deux → décider par le format dominant (≥ 6/10 du même type).
Manuel jusqu'à ~30 requêtes ; pas de scraping automatisé de Google.

### T10 — CTR anormaux — P2 BE / P3 AT — REX
Simplification obligatoire à ces volumes : pas de loi de puissance. Médiane du CTR hors marque par tranche de
position (1-3, 4-6, 7-10, 11-20) sur 12 mois, requêtes ≥ 50 impressions. Une requête ≥ 300 impressions/an dont le
CTR est < 60 % de la médiane de sa tranche → candidate. Avant de toucher au titre : vérifier la SERP (résumé IA,
bloc produits, carte locale). Abandon si 10 titres corrigés ne gagnent pas +20 % de CTR en 8 semaines.

### T12 — Décision sur une page existante — P2 — REX
Ordre : 1) format : si ≥ 3 des 5 premiers résultats sont d'un autre type que la page → refonte de format, pas mise à jour ;
2) décroissance : impr −30 % et position −2 rangs sur 90 j vs 90 j → mettre à jour ;
3) < 20 visites/mois → ne pas mettre à jour, envisager une fusion (Ahrefs : ces pages rapportent peu après mise à jour) ;
4) mise à jour = > 10 % des mots modifiés, viser > 30 % (Raptive, 103 000 pages : ≤ 10 % ≈ +2 %, > 100 % ≈ +44 %) ;
5) suppression seulement si 0 impression sur 180 j **et** 0 lien externe **et** aucun rôle commercial (fiche technique
téléchargée par les crèches, page de garantie…) ; sinon améliorer ou rediriger.
Jamais changer la date sans changement réel (Google, auto-évaluation « helpful content »).
Mesurer avec T07.

### T13 — Taux de pages actives par gabarit — P2 BE / P3 AT — REX
Segments BE : catégories, `/produit/`, `/realisations/`, `/guides/`, `/conseils/`, `/nl/*`, pages institutionnelles.
Par segment (≥ 20 URLs, sinon fusionner) : part d'URLs avec ≥ 1 clic sur 90 j, profondeur médiane, liens entrants médians.
Segment < la moitié de la médiane + profond + peu lié → maillage ; peu profond, bien lié, impressions sans clics → contenu/intention.

### T14 — Entonnoir d'indexation — P1 — DOC
**Protocole**
1. URLs du sitemap (BE : 166 URLs, AT : 59 URLs au 20/11/2026) vs rapport d'indexation GSC.
2. Taux séparés soumis→découvert→exploré→indexé (jamais un taux global).
3. Alertes *(convention)* : « Détectée, non indexée » > 10 % des URLs du sitemap ; « Explorée, non indexée » > 20 % → qualité/duplication ;
   toute soft 404 → correction ; 5xx > 1 % ou 503/429 > 2 jours → urgence (Google réduit durablement l'exploration).
4. API d'inspection (2 000 requêtes/jour/site) sur les URLs non indexées : canonical déclarée vs retenue par Google.
   Écart → T49 ; jamais traiter par robots.txt.
Spécifique BE : faire tourner sur les 5 propriétés ; les URLs `/nl/produit/` à slug français sont à surveiller.

### T15 — Logs nginx : robots des moteurs — P2 — DOC+REX
Les deux sites sont auto-hébergés : les logs existent (avantage rare). Prérequis : connaître le chemin et la
rétention (Apache garde 7 jours par défaut ; nginx dépend de logrotate) et la porter à 90 jours, IP tronquées si
conservées plus longtemps (RGPD à valider).
Protocole : vérifier Googlebot/Bingbot par DNS inverse puis direct ; jamais sur le seul user-agent. Joindre au
crawl : URLs du sitemap jamais demandées en 30 j (déclarer « non explorée » seulement au-delà de 3× la latence
médiane), URLs demandées absentes du site (anciennes URLs → T59), distribution des codes.
Sur ces petits sites, sert à **diagnostiquer un incident**, pas à « optimiser le budget de crawl » (Google : pas
nécessaire sous ~1 000 pages).

---

## C. Concurrence

### T20 — SERP par type d'acteur × format — P1 — REX
**Pourquoi P1** : 30 minutes par grappe, gratuit, et c'est le seul outil qui dit si une requête est jouable avant
d'écrire une ligne.
**Protocole**
1. Grappe de 10-20 requêtes d'une même famille, formulées comme les clients (fr-BE ; nl-BE séparément).
2. Relevé manuel du top 10 depuis la Belgique + éléments non organiques (résumé IA, bloc produits, carte locale, vidéos).
3. Coder chaque résultat : acteur (fabricant, distributeur spécialisé, place de marché, média, forum, annuaire,
   institutionnel, agrégateur) × format (fiche produit, catégorie, comparatif, guide, actu, forum, vidéo, avis).
4. Décisions *(convention)* : un format ≥ 60 % = produire ce format ou renoncer ; ≥ 2/10 positions tenues par
   forum/annuaire/hors sujet = attaquable ; ≥ 6/10 par places de marché/généralistes = fermée pour une petite structure
   (sauf format absent) ; format pertinent absent sur ≥ 70 % des requêtes = créneau.
5. Noter si un résumé IA occupe le premier écran : cela plafonne le trafic récupérable.
Grappes de départ : BE « mobilier crèche Belgique / meubles collectivité petite enfance / module psychomotricité crèche » ;
AT « escalier sur mesure [ville] / cuisine sur mesure menuisier / agencement bureau sur mesure Bruxelles ».

### T17 — Inventaire concurrent par sitemap — P2 — DOC
robots.txt → index de sitemaps → sitemaps : compter les URLs par motif (= ses gabarits et ses volumes). Une requête
par fichier, rien de plus. Utile pour savoir où un concurrent investit (catégories crèche ? guides ?).

### T18, T19, T21, T22, T23 — P3
Diff d'inventaire daté (CDX), PageRank interne d'un concurrent, concentration de sa visibilité, ses liens morts,
sa taxonomie de facettes. Méthodes valables mais coûteuses ou dépendantes d'outils payants, pour un gain de
décision faible à ce stade. Respecter robots.txt, débit ≤ 1 requête/1-2 s, arrêt sur 403/429.

---

## D. GEO — être compris, cité et recommandé par les assistants IA

### Ce qui est mesurable aujourd'hui et ce qui ne l'est pas
- Mesurable : visites cliquées depuis certains assistants (T30, avec une part inconnue sans référent) ; impressions
  dans les fonctionnalités IA de Google (rapport GSC « IA générative » depuis juin 2026 : impressions seules, ni clics
  ni requêtes) ; citations Bing/Copilot (T32, à confirmer) ; récupérations de pages par les agents IA dans nos logs (T16) ;
  présence dans des réponses échantillonnées (T28) ; déclarations des clients (T31).
- Non mesurable : citations sans clic dans ChatGPT/Gemini/Claude ; clics AI Mode séparés ; part du trafic « direct »
  venue d'une recommandation IA. Tout tableau de bord « trafic IA » doit afficher ces trous.

### T26 — Robots IA — P1 (contrôle) — DOC
**État au 20/11/2026** : robots.txt des deux sites = `User-agent: * Allow: /` (+ exclusions panier/commande sur BE).
Rien ne bloque les agents de recherche. Décision par défaut recommandée : garder tous les agents de recherche et de
récupération autorisés (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Googlebot, Bingbot) ;
l'entraînement (GPTBot, ClaudeBot, Google-Extended) est une décision commerciale d'Erwan — aucun éditeur ne documente
de gain ou de perte de citation lié à ce choix.
Pièges : bloquer Google-Extended ne sort pas des résumés IA de Google ; `nosnippet` coupe aussi les extraits classiques ;
ChatGPT-User et Perplexity-User ne respectent pas toujours robots.txt (aveu des éditeurs).
Contrôle trimestriel : relire les pages officielles des éditeurs (listes d'agents changées en 2025-2026) ; vérifier
dans les logs que les agents autorisés passent réellement (sinon chercher un blocage WAF/pare-feu en amont).
Optionnel P3 : `Content-Signal: search=yes, ai-input=yes, ai-train=…` (syntaxe Cloudflare, vocabulaire IETF AIPREF
en cours) — effet sur les citations : inconnu.

### T16 — Agents IA « utilisateur » dans les logs — P1 — EXP
**Pourquoi** : une requête de ChatGPT-User / Claude-User / Perplexity-User signifie qu'un utilisateur a posé une
question qui a fait ouvrir cette page. C'est la trace la plus proche d'une citation qu'un site puisse voir.
**Protocole**
1. Filtrer les logs sur ces user-agents ; vérifier chaque IP contre les plages publiées (openai.com/chatgpt-user.json,
   searchbot.json ; équivalents Anthropic et Perplexity). Non vérifié = non compté.
2. Mensuel : récupérations par agent et top 20 URLs ; URLs ≥ 5 récupérations / 30 j = pages que les assistants lisent →
   prioritaires pour T33/T34 et pour vérifier que les faits y sont exacts.
3. Récupérations sans aucune visite référée sur la même page → la page est lue mais peu cliquée : normal en GEO, ne pas
   en conclure un échec.
**Limite** : une récupération n'est pas une citation. **Abandon** : < 10 récupérations vérifiées/mois après 90 j →
garder la collecte, arrêter le rapport.

### T28 — Panel de prompts répété — P1 — EXP
**Protocole (version petite structure)**
1. Figer 20-30 prompts acheteurs **sans la marque**, en français de Belgique (BE : directrice de crèche, échevin,
   parent ; AT : particulier qui rénove, architecte). Ex. « Quel fabricant belge pour du mobilier Montessori de crèche ? »,
   « Menuisier pour un escalier sur mesure près de Namur ? ». Ne plus les modifier (comparabilité).
2. Un seul assistant au départ (celui que les clients citent dans T31), session privée ou API, ≥ 5 exécutions par prompt.
3. Pour chaque réponse, coder : marque absente / nommée / citée avec lien / recommandée ; concurrents nommés ; sources citées ;
   **exactitude des faits sur Elysta** (prix, délais, matériau, lieu, normes) — une citation fausse est un risque commercial.
4. Prévalence = part des exécutions où la marque apparaît ; intervalle à 95 % par bootstrap (1 000 réplicats, sur les réponses entières).
   Conclure à un changement seulement si les intervalles de deux trimestres ne se recouvrent pas (en pratique, écarts < 5-7 points illisibles).
5. Si absent, localiser l'étape de perte (cadre 6 étapes, G24) : connu de mémoire ? requête de recherche générée ?
   page trouvée ? page lue (T16) ? retenue ? citée ? Absent dès l'étape 1 → notoriété/sources tierces (T29, T57, T60) ;
   lu mais pas cité → contenu (T33, T34, T40).
**Limites** : base de preuve mince (un préprint 2026, 9 jours, produits grand public) ; accord entre répétitions
~57-61 % dans une autre étude ; ne jamais publier un « score de visibilité IA » sans intervalle.
**Abandon** : si l'intervalle mesuré dépasse 8 points, le dispositif est sous-dimensionné : soit plus d'exécutions,
soit s'en tenir à T16/T30/T31.

### T30 — Canal IA dans GA4 — P1 — REX/DOC
1. D'abord l'inventaire de perte : cliquer chaque type de lien de chaque assistant vers le site et relever
   `document.referrer` + paramètres (ChatGPT ajoute souvent `utm_source=chatgpt.com` sans `utm_medium` → « Unassigned »).
2. Groupe de canaux personnalisé « Assistants IA » placé avant Referral/Direct : `chatgpt\.com|chat\.openai\.com|perplexity\.ai|gemini\.google\.com|copilot\.microsoft\.com|claude\.ai|mistral\.ai`.
3. Publier le taux de couverture (part des types de liens qui transmettent un référent) à côté de tout chiffre.
   < 60 % → présenter le chiffre comme un plancher.
4. Suivre les pages d'atterrissage et les conversions (demande de devis, commande).
Note : un canal par défaut « AI Assistant » aurait été ajouté à GA4 en mai 2026 — non confirmé, vérifier dans l'interface.

### T31 — Attribution déclarative — P1 — REX
**Pourquoi P1** : c'est la seule mesure qui relie une recommandation IA sans clic à un devis. Effet carnet direct.
1. Champ « Comment nous avez-vous connus ? » sur les formulaires de devis (BE crèches, AT) avec options : Google,
   ChatGPT, Perplexity, Gemini, Copilot, autre assistant IA, bouche-à-oreille, architecte/prescripteur, salon, réseaux sociaux, autre.
   Facultatif (ne pas faire chuter la conversion).
2. Même question au premier appel téléphonique ; consigner dans Odoo/Hub.
3. Mensuel : croiser avec T03 (recherches de marque) et T30.
**Abandon** : si le taux d'abandon du formulaire monte après ajout, déplacer la question après l'envoi.

### T32 — Bing Webmaster Tools / AI Performance — P1 — DOC (à confirmer)
1. Vérifier que les 5 domaines BE et AT sont enregistrés dans Bing Webmaster Tools (import depuis GSC possible).
2. Si le rapport AI Performance existe (Gemini : aperçu public depuis février 2026) : exporter chaque mois les CSV
   (séries, pages citées, requêtes d'ancrage avec intention et « Citation Share »).
3. Règles : ne pas additionner les Citation Share entre requêtes ; une requête d'ancrage n'est pas un prompt utilisateur ;
   une citation n'est pas un clic. Repérer les intentions (comparative, commerciale) à faible part → format manquant (T20).
4. Concentration : si > 50 % des citations viennent d'une seule URL, risque de dépendance ; étendre ses qualités aux autres gammes.
**Abandon** : < 10 citations/mois pendant 6 mois → passage trimestriel.

### T33 — Écrire citable — P1 — REX
Étude GEO (Aggarwal et al., KDD 2024, moteurs de 2023) : ajout de citations attribuées +41 % de visibilité, statistiques
+33 %, sources +28 % ; bourrage de mots-clés −9 %. Gains surtout pour les pages hors première position. Ordres de grandeur
non transposables à 2026 ; le classement relatif des méthodes est l'enseignement utile.
Règle *(convention)* : par passage de ~150 mots, ≥ 1 source nommée et datée et ≥ 2 énoncés quantifiés avec unité.
Matière propre à Elysta : épaisseurs et essence (multiplex de bouleau), dimensions réelles, charges testées, délais
d'atelier, nombre de crèches équipées, « monté à blanc à l'atelier » (AT), fourchettes de prix réelles.
**Jamais** de chiffre ou de citation inventés ; chaque chiffre passe la validation de T46 (contrôle 10).

### T34 — Passages autonomes — P1 — DOC (classement par passages) + HYP (recette)
Contrôles mécaniques : intitulé H2/H3 formulé comme la question ; 2-4 premières phrases répondant sans le reste de
la page ; sujet nommé (pas « il », « ce produit ») ; unités, devise et HT/TVAC écrits ; tableau HTML dès ≥ 3 valeurs
comparables ; date si l'info est périssable ; aucun bloc > 300 mots sans sous-titre.
Ne pas multiplier les pages « une question = une page ». Le balisage FAQ n'est pas un levier de citation démontré
(Seer, mai 2026 : la cohorte la plus balisée FAQ sous-performait) — le garder s'il existe, ne pas en attendre d'effet.

### T35 — Entité stable et faits concordants — P1 — DOC (balisage) + HYP (effet IA)
1. Fiche d'identité canonique par marque : nom exact, raison sociale (SEMEM Art & Design SRL), TVA BE0695884136,
   adresse, téléphone, catégorie en une phrase, année, gammes, zones, langues.
2. JSON-LD `Organization` une fois, complet (`legalName`, `vatID`, `address`, `contactPoint`, `logo`, `sameAs` vers
   3-10 profils réellement contrôlés : Trustpilot, Google Business Profile, LinkedIn, Facebook, Instagram, annuaires sectoriels).
3. **Désambiguïsation des deux marques** : même société, même adresse, même téléphone. Chaque site doit dire
   explicitement que l'autre marque existe et ce qu'elle fait (les deux llms.txt le font déjà), et relier les deux
   `Organization` (`parentOrganization` vers SEMEM ou `brand`) au lieu de laisser deux entités confuses.
4. Contradictions web (C33) : recenser ce que disent les annuaires, Trustpilot, réseaux, articles, et les réponses
   IA de T28 ; corriger d'abord les **faits faux** (adresse, téléphone, activité, « revendeur » au lieu de fabricant).
5. Ne pas créer soi-même de page Wikipedia/Wikidata.
Abandon de l'effet GEO : si la prévalence T28 n'a pas bougé au-delà de l'intervalle 180 j après, garder la cohérence
(hygiène utile au local) mais ne plus la compter comme levier GEO.

### T27 — llms.txt — P2 — REX
Les deux sites ont déjà un llms.txt factuel et bien fait. Ne plus y investir de temps : Ahrefs (mai 2026, 137 210 domaines)
→ 97 % des llms.txt jamais demandés ; Google : aucun système ne l'utilise. Action unique : compter dans les logs les
requêtes vérifiées sur `/llms.txt` ; le garder s'il est régénéré automatiquement ; s'assurer qu'il ne contredit jamais
les pages (prix, tarifs de livraison — risque de deux vérités).

### T29 — Sources tierces surreprésentées — P2 — REX
Avec les réponses de T28 : lister les domaines cités, prévalence par domaine. Cibler une source si prévalence > 20 %
et présence légitime possible (annuaire, comparatif éditorial, fiche, contribution signée). Les classements publiés
(Reddit 20 % ici, 0 % là) se contredisent et sont américains : ne pas les reprendre.
Interdit : faux témoignages, comptes non déclarés, texte caché pour les robots.

### T37 — Requêtes « d'agents » dans GSC — P3 — REX (1 source)
Regex de syntaxe (opérateurs `site:`, numérotation, formulations longues formelles) pour isoler des impressions
sans clic qui plombent le CTR. Suspendre si < 1 % des impressions nommées 3 mois de suite.

---

## E. Éditorial et sémantique

### T39 — Questions réelles — P1 — REX
**Pourquoi P1** : les e-mails de devis et de SAV sont la source que les concurrents n'ont pas, et c'est le
vocabulaire exact des acheteurs (crèches, architectes).
1. Corpus : 12 mois de mails devis/SAV (local, anonymisé), notes d'appel, recherche interne du site si suivie
   (GA4 `view_search_results`), requêtes GSC interrogatives : `^(quel|quelle|quels|quelles|comment|pourquoi|quand|combien|est-ce|peut-on|faut-il|à partir de)\b` (+ équivalent néerlandais `^(welke|hoe|waarom|wanneer|hoeveel|vanaf)\b`).
2. Extraire les questions, regrouper par famille, compter.
3. Priorité 1 : ≥ 3 occurrences/an **et** aucune page n'y répond dans le premier écran **et** la réponse exige une donnée
   que seul le fabricant a. Priorité 2 : les deux premières conditions.
4. Regrouper 3 à 8 questions d'une même famille par page — jamais une page par question.
Ex. probables BE (à confirmer par les données) : délais pour une crèche, normes, nettoyage/désinfection, financement,
marchés publics. AT : prix au mètre, délai, pose, montage à blanc, bois massif vs multiplis (page existante).

### T40 — Faits propriétaires — P1 — EXP
1. Une page = une question explicite.
2. Liste de faits nécessaires depuis : les 5 premiers résultats (faits, pas formulations), T39, et l'atelier
   (cotes réelles, charges, essences, temps de montage, défauts observés, retours d'usage en crèche).
3. Pondération par 2 personnes (0/1/2). Couverture = Σ poids couverts / Σ poids totaux ≥ 0,80 *(convention)*.
4. Apport marginal : ≥ 3 faits de poids ≥ 3 absents des 5 concurrents, dont ≥ 1 issu de l'atelier *(convention)*.
5. Densité : faits/1 000 mots ≥ médiane des concurrents (pas de délayage).
6. Archiver la liste de faits avec la page (rend la mise à jour T12 décidable).
L'idée « gain d'information » (brevet Google, déploiement non confirmé) est une hypothèse ; la valeur de la méthode
est éditoriale et ne dépend pas du brevet.

### T46 — Porte qualité avant publication — P1 — DOC
Bloque toute publication proposée par l'agent tant qu'un contrôle échoue.
Automatiques : 1) auteur réel nommé avec page de présentation ; 2) usage d'IA signalé s'il y en a ; 3) date affichée =
dernière modification substantielle (≥ 10 % des mots) ; 4) ≥ 1 donnée chiffrée interne ; 5) ≥ 1 visuel d'atelier ou de
réalisation réelle ; 6) zéro faute ; 7) aucune reprise de > 30 mots d'une autre page du site.
Humains (Erwan, avec trace écrite) : 8) pourquoi cette page existe — « pour se classer sur X » = refus ;
9) qui a l'expérience de première main ; 10) exactitude technique (sécurité enfant, âge, charge, normes : aucun chiffre
normatif sans vérification de la norme) ; 11) un lecteur repart-il servi sans autre page ; 12) la page n'existe pas déjà ailleurs.

### T41 — Termes manquants — P2 — REX
Par page : requêtes GSC 3 mois, mots présents dans les requêtes et absents du texte principal (hors menus), triés par
impressions. Intégrer seulement ce qui est vrai (jamais une essence ou une norme qu'on n'utilise pas), en H1/titre si cela
redéfinit le sujet, sinon chapeau ou H2. Revoir à 2-4 semaines. Utile aussi pour la dénomination (ex. « tour d'apprentissage » vs « tour d'observation »).

### T42 — Donnée originale citable — P2 — REX
Un actif par an maximum : une grandeur mesurée à l'atelier, protocole publié, URL stable, tableau téléchargeable,
phrase de citation prête. Choisir une grandeur dont ≥ 3 pages tierces parlent sans source chiffrée. Données de
sécurité enfant = validation technique et juridique obligatoire. AT : les pages « combien coûte… » sont déjà un
actif de ce type si les fourchettes viennent de devis réels datés.

### T44 — Sous-requêtes (verrou anti-usine) — P2 — HYP
GSC + suggestions + « autres questions posées » (relevé manuel, daté) → sous-intentions → URL existante qui les traite.
Créer une page seulement si la sous-requête ne tient pas dans une section existante **et** a ≥ 3 faits propres (T40).
Sinon : une section.

### T38, T43, T45, T47 — P2/P3
- T38 fraîcheur réelle : jamais de date rafraîchie sans changement ; tenir à jour prix et tarifs de livraison (llms.txt compris).
- T43 saillance NLP : diagnostic seulement, jamais comme objectif de rédaction.
- T45 cocon : garder la discipline « une page = une intention décidée avant d'écrire », pas la théorie du « poids ».
- T47 nommage produit identique dans titre, alt, schema, fiche Odoo (champ web dédié).

---

## F. Technique et structure

Les deux sites sont des builds Astro statiques sur nginx : HTML complet servi, ETag présents, sitemaps propres.
Les techniques techniques sont donc surtout des **contrôles**, pas des chantiers.

- **T49 (P2)** canonical auto-référente sur chaque page, aucune canonical vers une autre langue, sitemap = URLs canoniques seulement, liens internes vers URLs finales (pas de 301 en chaîne).
- **T48 (P2)** crawl (Screaming Frog gratuit ≤ 500 URLs) : orphelines (dans le sitemap, 0 lien interne), profondeur ≤ 3 pour les pages qui mènent à un devis, pages commerciales sous-liées → liens contextuels depuis guides et réalisations. Le score PageRank interne est un proxy, pas l'algorithme.
- **T50 (P2)** Core Web Vitals en données terrain (rapport GSC, CrUX) au 75e centile : LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1. S'arrêter au seuil. Si CrUX n'a pas de données (petit trafic), le dire au lieu de décider sur Lighthouse.
- **T51 (P2)** images en `<img src>` (pas en fond CSS), noms de fichiers descriptifs, alt spécifiques, sitemap images, image principale désignée (`og:image` / `primaryImageOfPage`). Photos d'atelier et de réalisations = contenu que les revendeurs ne peuvent pas produire. Suivre le type de recherche « Image » dans GSC.
- **T52 (P2)** balisage existant (BE : Organization, WebSite, FAQPage, Product/Offer/OfferShippingDetails/MerchantReturnPolicy ; AT : GeneralContractor, Place ×10, Person, FAQPage) : valider, relier par `@id`, n'utiliser que des avis réellement visibles et collectés conformément aux règles (ne pas reprendre la note Trustpilot en `aggregateRating` sans vérifier la politique Google sur les avis), `areaServed` cohérent avec la réalité.
- **T53 (P3)** ETag présents mais `Cache-Control: no-store` ; tester qu'une requête `If-None-Match` répond 304. Gain d'exploration négligeable sur ~200 URLs.
- **T55 (P3)** HTML brut = rendu (Astro) : contrôle après tout ajout de composant JS (configurateur, sélecteur de variantes).

---

## G. Autorité et notoriété

### T59 — Liens perdus vers nos propres 404 — P1 — DOC
**Pourquoi P1** : les sites sont passés d'Odoo à Astro ; les anciennes URLs Odoo (`/shop/...`, `/blog/...`, `/page/...`)
qui reçoivent encore des liens externes sont probablement en 404. C'est de l'autorité perdue récupérable sans rien
demander à personne.
1. GSC → Liens → pages les plus liées ; GSC indexation → 404 ; logs nginx → URLs demandées en 404 avec référent externe.
2. Croiser : URL en 404 + ≥ 1 domaine référent = cible.
3. 301 vers la page vivante de même sujet ; jamais vers l'accueil (soft 404) ; une seule redirection, pas de chaîne.
4. Recréer la page plutôt que rediriger si ≥ 3 domaines référents et sujet encore commercial.
5. Vérifier code et destination après pose. Validation d'Erwan avant production.
**Abandon** : < 3 URLs concernées au premier passage → contrôle post-migration uniquement.

### T57 — Cartographie d'autorité par registres officiels — P1 BE / P2 AT — EXP
**Pourquoi P1 BE** : la même liste sert à la fois au SEO (sources qui pourraient citer Elysta pour une raison de fond)
et à la **prospection crèches** — c'est un des rares chantiers SEO à double effet carnet.
1. Registres : My.ONE (milieux d'accueil autorisés FWB), Kinderopvangzoeker d'Opgroeien (Flandre + Bruxelles NL),
   Iriscare (bicommunautaire Bruxelles). Vérifier les conditions d'utilisation avant toute extraction automatique ;
   données de personnes physiques (accueillantes) = RGPD, ne pas les traiter.
2. Quatre listes : L1 tutelles et pouvoirs publics ; L2 fédérations et coupoles ; L3 presse pro, écoles de puériculture,
   hautes écoles, formations Montessori/Pikler ; L4 prescripteurs (psychomotriciens, conseillers pédagogiques, architectes).
3. Garder une cible si elle publie des ressources **et** a une raison non promotionnelle de citer un fabricant
   (norme, sécurité, matériau, aménagement). Max 25 cibles actives.
4. Marchés publics (Bulletin des Adjudications, compte requis) : lire les critères techniques des avis de fourniture —
   matière première de T42. Non démontré qu'il existe un flux régulier de marchés de mobilier de crèche : à qualifier.
5. AT, transposition non sourcée : architectes et architectes d'intérieur (Ordre des architectes), bureaux d'études,
   promoteurs de la zone d'intervention.
**Abandon** : < 3 liens, mentions ou contacts qualifiés sur 25 cibles après 9 mois.
Tout contact est humain.

### T56 — Impressions de marque vs domaines référents — P2 — HYP
Brevet US 8,682,892 (2012, expiré) : ratio liens indépendants / requêtes de marque. Sens de l'effet inconnu : ne
sert qu'à détecter une rupture (±25 % sur 2 mois sur un terme sans l'autre) à confronter au journal T06.
Jamais d'action pour gonfler artificiellement les recherches de marque.

### T58 — Mentions non liées — P2 — REX
Google Alerts + recherche trimestrielle `"elysta" -site:elysta.be`. Demander un lien uniquement : citation neutre ou
positive, éditeur indépendant, page modifiable, < 18 mois ; ≤ 10 demandes/mois ; une relance ; jamais de contrepartie.
Mueller (rapporté) : une mention non liée n'est pas un facteur de classement — l'intérêt est la conversion en lien et la notoriété.
Envoi par un humain.

### T60 — Retours d'usage tiers — P2 — EXP
Les assistants s'appuient sur des récits indépendants (crèches, parents, architectes). Demander des avis et témoignages
vrais (Google Business Profile, Trustpilot), des études de cas co-signées avec des crèches, des publications de
partenaires (ex. réalisations professionnelles AT). Aucun faux avis, aucune incitation non conforme.

---

## H. Local et multilingue

### T61 — Google Business Profile — P1 — DOC
1. Régime : atelier qui reçoit sur rendez-vous avec enseigne + livraisons/poses chez le client → **hybride** (adresse
   affichée + zones de service par commune, ≤ 20 zones, ≤ ~2 h de trajet). Sans enseigne permanente → zone de service, adresse masquée.
2. **Deux marques à la même adresse** (règles vérifiées le 20/11/2026, answer/3038177) : une fiche par marque seulement
   si les marques fonctionnent indépendamment ; jamais de nom combiné ; enseigne permanente au nom affiché ; téléphone relié
   à l'établissement (le partage d'un numéro n'est ni autorisé ni interdit explicitement). Décision retenue : une fiche
   Elysta Atelier ; pas de seconde fiche tant qu'enseigne et téléphone sont communs. Activité sur rendez-vous : pas d'horaires affichés.
3. Catégorie principale la plus précise (enquête Whitespark 2026 : premier facteur — opinion de 47 praticiens, contestée
   par Localo sur 16 098 fiches). Nom légal exact, sans mots-clés ajoutés.
4. Photos d'atelier, de machines, de réalisations ; produits ; services ; avis sollicités sans filtre ni incitation ; réponse à tous.
5. Limite dure : la distance au chercheur est un facteur que rien ne change ; la fiche sert la zone Andenne-Namur-Huy, pas Bruxelles.
**Abandon** (de l'investissement, pas de la fiche) : < 10 interactions/mois après 6 mois → maintenance minimale.

### T62 — NAP — P1 — DOC+HYP
Forme canonique écrite une fois par marque ; recenser les occurrences (téléphone et adresse entre guillemets) ;
corriger d'abord les **adresses et téléphones faux**, puis les variantes de nom ; registre BCE, tutelles, fédérations,
cartes, annuaires. Afficher adresse et téléphone en clair sur le site (Google les liste comme signaux de géociblage).
Pas d'inscriptions payantes dans des annuaires généralistes.

### T63 — Pages géographiques — P2 BE / **P1 AT** — DOC
**Pourquoi P1 AT** : 12 pages villes existent (`escalier-sur-mesure-{andenne,brabant-wallon,bruxelles,huy,liege,namur}`,
`menuisier-sur-mesure-{…}`). La politique anti-spam de Google nomme explicitement « pages ciblant des villes qui
canalisent vers une seule page » (doorway abuse) et leur génération en lot (scaled content abuse). C'est le risque
de sanction le plus concret identifié sur les deux sites.
**Protocole d'audit (à faire avant toute nouvelle page villes)**
1. Test de substitution : remplacer le nom de la ville par une autre ; si la page reste vraie, elle est à risque.
2. Exiger ≥ 3 éléments vérifiables propres à la zone *(convention)* : réalisation livrée dans la zone avec photo,
   témoignage nommé d'un client de la zone (accord écrit), contrainte logistique réelle, partenaire/prescripteur local,
   élément institutionnel local.
3. La page doit répondre entièrement à l'intention locale, pas renvoyer vers une page générique.
4. Pour chaque page : impressions GSC sur requêtes « produit + lieu » ; < 50/mois après 9 mois et aucun contact → fusion
   dans la page générique en 301 (décision d'Erwan).
5. Aucune nouvelle page villes générée par l'agent. Rédaction humaine, une par trimestre maximum.
6. Cannibalisation entre pages villes et pages génériques : T08.

### T64 — hreflang multi-domaines — **P1 BE** — DOC
**État au 20/11/2026** : l'accueil de elysta.be déclare `fr-BE` (elysta.be), `nl-BE` (elysta.be/nl/), `fr-FR` (elysta.fr),
`nl-NL` (elysta.nl), `de-DE` (elysta.de), `x-default` (elysta.be). Cinq versions sur quatre domaines : chaque erreur de
réciprocité fait ignorer l'annotation, en silence (le rapport GSC dédié n'existe plus depuis le 22/09/2022).
**Protocole trimestriel**
1. Crawl des 5 versions : pour chaque URL, extraire les annotations ; vérifier auto-référence, réciprocité complète,
   codes ISO valides, URLs absolues, une seule méthode (HTML **ou** sitemap, pas les deux).
2. Canonical toujours auto-référente, jamais vers une autre langue/pays (piège principal rapporté par les praticiens BE/FR).
3. Pas de redirection automatique par langue ou IP (Googlebot crawle depuis les États-Unis sans `Accept-Language`).
4. Les pages profondes (produits, guides) doivent avoir leurs équivalents ; un produit sans équivalent ne déclare que les versions existantes.
5. Contenu principal réellement traduit (pas seulement la navigation) ; slugs dans la langue (ex. `/nl/produit/armoire-murale-1-2-3-soleil/` : slug français dans la version néerlandaise).
6. Suivi par pays dans GSC (5 propriétés) : si une version pays reçoit < 5 % des impressions de sa langue après 9 mois et
   n'a pas d'élément commercial propre (prix, livraison, TVA, mentions), envisager la fusion (T65).

### T65 — Décider une version linguistique — P2 BE — EXP
Avant d'investir dans une version (ou de garder elysta.nl séparé de /nl/) : 15-25 termes centraux, deux candidats
néerlandais (NL standard / flamand, fournis par un locuteur flamand, pas par traduction automatique), volumes séparés
Belgique / Pays-Bas. *(Conventions)* : volume NL-BE < 30 % du FR-BE exploité → pas de version ; divergence lexicale > 40 %
→ nl-BE et nl-NL ne peuvent pas partager un texte ; < 15 % → une seule version `nl` suffit. Le service client doit pouvoir
répondre dans la langue, sinon ne pas ouvrir. Test sur 3 pages avant extension.
