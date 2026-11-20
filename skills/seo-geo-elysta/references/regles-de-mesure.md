# Règles de mesure — à lire avant de chiffrer

## 1. Calibrage des volumes (relevé GSC, 18/08 → 16/11/2026, données finales)

| Propriété | Clics 90 j (Belgique) | Impressions 90 j (Belgique) | Position moy. | Autres pays notables |
|---|---|---|---|---|
| elysta.be | 1 067 | 45 316 | 7,2 | FR 48 clics, NL 8, DE 9, LU 9 |
| elysta-atelier.be | 181 | 12 407 | 20,7 | FR 3 clics |

Soit ≈ 390 clics/mois (BE) et ≈ 60 clics/mois (AT), tous pays confondus. À recalculer chaque trimestre (T01).
Propriétés pays (elysta.fr, .nl, .de) non relevées ici.

## 2. Ce que ces volumes interdisent

| Méthode | Seuil minimal approximatif | Applicable ? |
|---|---|---|
| Split test SEO (+10 % détectable) | ~15 000 clics sur le gabarit pendant le test | Non |
| CausalImpact | 36 mois d'historique + témoin validé par injection | Non |
| Régression segmentée / ITS | ≥ 50 clics par point de mesure | Non |
| Loi de puissance CTR propre au site | ≥ 10 requêtes par position, R² ≥ 0,85 | Non (médiane par tranche à la place, T10) |
| STL / Prophet saisonnalité | ≥ 24 mois archivés, quelques centaines d'impr./semaine/segment | Pas avant 2028 au mieux |
| Lot traité vs témoin (T07) | ~500 clics par lot et période → effets > 40 % seulement | Oui, en « indicatif » |
| Panel IA (T28) | 30-50 exécutions/moteur pour un intervalle de ±5 pts sur la prévalence ; 150+ pour la part de citations | Oui, sur un moteur, en prévalence |

Conséquence : sur ces sites, l'agent **décrit**, **alerte** et **propose** ; il ne « prouve » presque jamais un effet.
Toute phrase du type « l'action X a fait +12 % » doit être remplacée par « +12 %, non distinguable du bruit » tant que
l'écart n'est pas > 30-40 % ou répété sur 2 périodes.

## 3. Pièges de mesure (classés par coût)

1. **Requêtes anonymisées** : une grande partie des requêtes d'un petit site n'apparaît jamais en ligne. Raisonner
   par page quand la part cachée > 30 % (T02). Un filtre de requête retire aussi ces requêtes des totaux.
2. **Agrégation propriété vs page** : deux URLs sur la même requête = une impression au total ; la position
   « propriété » est celle du meilleur lien. Ne pas comparer un total de graphique à une somme de lignes.
3. **Données préliminaires** : jamais d'analyse sur les 3 derniers jours ; données quotidiennes en heure du Pacifique.
4. **Position moyenne** : une requête à 3 la moitié du temps et 15 l'autre affiche 9. Aucune décision sur une
   variation de position < 1,5.
5. **Bruit statistique** : à < 100 impressions par mois, une variation de 50 % est banale.
6. **User-agent non vérifié** : n'importe qui se déclare Googlebot ou ChatGPT-User. Vérification DNS (moteurs) ou
   plages d'IP publiées (OpenAI, Anthropic, Perplexity) obligatoire.
7. **Référents IA perdus** : applications de bureau, certains modes « recherche approfondie », Grok, DeepSeek ne
   transmettent pas de référent. Le canal IA de GA4 est un plancher.
8. **Une récupération n'est pas une citation ; une citation n'est pas un clic ; un clic n'est pas un devis.**
9. **Réponses IA non déterministes** : une capture unique ne mesure rien. ≥ 5 exécutions par prompt, taille
   d'échantillon fixée d'avance, pas d'arrêt anticipé, intervalle par bootstrap, conclusion seulement si les
   intervalles ne se recouvrent pas.
10. **Indices de visibilité d'outils tiers** (Sistrix, Semrush…) : modèles propriétaires, couvrent mal les niches
    belges. Ne pas les présenter comme du trafic.
11. **Courbes de CTR publiées** : de 1 % à 47 % en position 1 selon l'étude et la SERP. Ne jamais les appliquer au site.
12. **Corrélation ≠ cause** : un gain après une action peut venir de la saison, d'un salon, d'un article de presse.
    Journal d'événements (T06) obligatoire.

## 4. Vocabulaire de rapport

- **FAIT** : chiffre issu d'une source nommée, avec période. « GSC, 18/08-16/11/2026, 1 067 clics BE. »
- **HYPOTHÈSE** : explication plausible, avec ce qui a été écarté et ce qui la confirmerait.
- **ESTIMATION** : calcul à partir d'hypothèses, avec la marge.
- **NON MESURABLE** : dire pourquoi, et ce qui le rendrait mesurable.
