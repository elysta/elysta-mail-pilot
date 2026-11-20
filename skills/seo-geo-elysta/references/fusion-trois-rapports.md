# Fusion des trois recherches (Gemini, ChatGPT, Claude) — 20/11/2026

## 1. Valeur comparée

| | Gemini | ChatGPT | Claude |
|---|---|---|---|
| Techniques | 47 | 46 | 64 |
| Fiches complètes (tous champs) | oui | non : « mise en œuvre » = recopie du mécanisme, alias vides | oui, très détaillées |
| Sources par fiche | oui, mais beaucoup de billets récents peu connus ; artefacts de citation `[span_…]` | non (liste générale en fin) | oui, avec niveau de lecture (« lue », « extrait seulement », « non lue ») |
| Seuils de décision | quelques-uns | non | nombreux, marqués « convention » quand non sourcés |
| Biais de contexte | a repris « site sous Odoo » partout (faux) | idem, plus léger | idem, plus léger |
| Apport propre | Bing AI Performance, attribution déclarative, GA4 canal IA, funnel GEO 6 étapes, justesse factuelle des citations | concurrence (sources citées par moteur, contradictions de marque sur le web, vocabulaire métier vs clients) | statistique de mesure (bootstrap, puissance, témoins), écoles RU/DE/FR, registres belges, SEO local belge, hreflang multi-pays |

Verdict : Claude sert d'ossature (méthode et preuves), Gemini apporte la **mesure GEO opérationnelle**, ChatGPT sert surtout
de **liste de contrôle** pour repérer les oublis.

## 2. Règles de fusion appliquées
1. Doublons détectés par **mécanisme** ; la fiche la mieux documentée est gardée, les autres sont citées en source.
2. Contexte corrigé : les sites sont en **Astro statique sur nginx auto-hébergé**, pas sous Odoo. Conséquences :
   facettes Odoo écartées ; logs serveur **disponibles** (Gemini les disait impossibles) ; rendu côté serveur acquis.
3. Volumes réels relevés dans GSC (≈ 390 et ≈ 60 clics/mois) → toutes les méthodes statistiques lourdes écartées.
4. Yandex écarté (aucun marché visé).
5. Priorisation selon le filtre commercial (carnet 3-6 mois), séparément pour chaque site.

## 3. Table de concordance (mécanisme → numéros d'origine)

| Catalogue | Gemini | ChatGPT | Claude |
|---|---|---|---|
| T01 archivage GSC | 5 | — | 2, 9 |
| T02 part cachée | 1 | 4 | 1 |
| T03 marque / hors-marque | 2, 17 | — | 1, 55 |
| T04 décomposition variation | 3, 4, 9 | 3, 9 | 4, 15 |
| T05 saisonnalité | — | 6 | 9, 17 |
| T07 effet / témoin (et écartés) | 10 | 7 | 10, 11, 12, 13, 47 |
| T08 cannibalisation | 8 | 1, 2, 13 | 3, 5 |
| T09 intention par SERP | — | 14 | 6 |
| T12 décision sur page | 14 | 8, 31 | 7, 43 |
| T13 segmentation gabarits | — | 5 | 8 |
| T14 entonnoir indexation | 12 | 11, 38 | 16, 52 |
| T15 logs moteurs | 11, 12, 13 | 10, 12 | 14 |
| T16 logs agents IA | 26, 27 | — | 36 |
| T17-T23 concurrence | 19 | 17-21 | 19-25 |
| T20 SERP acteur × format | — | 15, 17, 18, 21 | 26 |
| T26 robots IA | 28 | — | 27, 28 |
| T27 llms.txt | — | — | 29 |
| T28 panel IA | 20, 24, 25 | 22, 23, 24, 26, 27 | 33, 34 |
| T30 canal GA4 | 29 | 25 | 35 |
| T31 attribution déclarative | 30 | — | — |
| T32 Bing AI Performance | 18, 31, 32 | 26 | — |
| T33 écrire citable | 21 | — | 30 |
| T34 passages autonomes | 22, 23 | 32 | 31, 44 |
| T35 entité / cohérence | 37 | 33, 34 | 32, 37, 51 |
| T39 questions réelles | 34 | 30 | 42 |
| T40 faits propriétaires | 19, 35 | 29, 35 | 39 |
| T41 termes manquants | 33 | 34 | — |
| T42 donnée originale | 21 | — | 58 |
| T46 porte qualité | — | — | 45 |
| T48-T55 technique | 13, 36, 38, 41, 42 | 36-40 | 46, 48-54 |
| T56-T60 autorité | 43, 45 | 41, 42, 43 | 55-59 |
| T61-T62 local | 46 | 44 | 60, 61 |
| T63 pages géographiques | — | — | 62 |
| T64-T65 multilingue | 46 | 45, 46 | 63, 64 |
| Écartés | 10, 15, 16, 40, 44 (partiel), 47 | 7 | 10, 11, 13, 17, 18, 22, 50 |

## 4. Points contestés ou non vérifiés — à ne pas citer comme faits
- Étude randomisée « −39,8 % de clics avec résumé IA » : référence exacte non retrouvée (Claude).
- Rapport Bing AI Performance (aperçu public février 2026), séparation AI Training / AI Grounding chez Bing
  (annonce 30/10/2026, effet 1/2/2027) : sources Gemini non vérifiées par nous.
- Canal « AI Assistant » par défaut dans GA4 (mai 2026) : source unique.
- « 46,77 % de requêtes anonymisées » (Gemini, via une agence citant Ahrefs) et « 46,08 % » (Ahrefs 2019) :
  ordres de grandeur, pas des constantes ; mesurer le nôtre (T02).
- Mentions non liées comme signal : Google (Mueller, rapporté) dit non ; Bing non vérifié.
- Enquête Whitespark (facteurs locaux) contestée par l'analyse Localo sur 16 098 fiches.
- Recherche originale = format qui attire le plus de liens : consensus d'agences contredit par la seule mesure trouvée (SpyFu).
- hreflang : l'annulation par une canonical croisée est rapportée par les praticiens, pas écrite dans la page hreflang de Google.
- Admissibilité de deux fiches Google Business Profile pour deux marques à la même adresse : non vérifiée.

## 5. Trous communs aux trois recherches
- Aucune étude GEO sur le français de Belgique ou le néerlandais.
- Aucune mesure publiée de l'effet d'une consolidation anti-cannibalisation, d'un nettoyage de pages faibles, d'un cocon,
  d'une fiche Wikidata sur les citations IA.
- Aucun annuaire professionnel belge identifié pour les fournisseurs de la petite enfance.
- Aucune méthode validée pour relier un signal extérieur au chiffre d'affaires d'une page concurrente.
→ Ces trous justifient la priorité donnée à T31 (attribution déclarative) et T16 (logs), les deux seules mesures directes
  que les sites peuvent produire eux-mêmes.
