# Pour Cavé — guide rapide

## Structure du projet (tout dans un seul dossier)

```
cave-anniversaire/
├── index.html          → la page du site
├── style.css             → toute l'identité visuelle
├── data.js                 → TOUT le contenu à personnaliser
├── main.js                   → la logique (pas besoin d'y toucher)
├── memory-01.jpg ... memory-06.jpg   → tes photos de souvenirs
├── bonus-01.jpg                        → photo(s) bonus (ajoutées après la soirée)
└── musique-de-fond.mp3                   → ta musique de fond (optionnel)
```

Tous les fichiers sont au même niveau, aucun sous-dossier — tu peux uploader tout le contenu de ce dossier tel quel sur n'importe quel hébergeur.

## Ce que tu dois modifier (tout est dans `data.js`)

1. `secretCode` — le code secret de la page "Le Secret".
2. `meetingTime` — l'heure de vos retrouvailles.
3. `loveReasons` — le portrait de lui (page "Toi").
4. `memories` — remplace `memory-01.jpg`, etc. par tes vraies photos, avec le **même nom de fichier** (ou change le nom dans `data.js` pour qu'il corresponde à ta photo).
5. `letter` — ta lettre personnelle.
6. `gateQuestions` — les questions pour avancer entre les pages.
7. `chapter6Enabled` — à activer après son anniversaire.

## Ajouter tes photos

Dépose simplement tes fichiers image dans ce même dossier, à côté d'`index.html` (pas de sous-dossier `images/`), puis mets à jour le nom du fichier dans `data.js` si besoin.

## Hébergement

### Netlify Drop — le plus simple
1. Va sur https://app.netlify.com/drop
2. Glisse-dépose le **dossier entier** sur la page.
3. Tu obtiens une URL publique en quelques secondes.

### GitHub Pages / Vercel
Pousse tous les fichiers de ce dossier (à plat) dans un repository GitHub, puis active GitHub Pages (Settings → Pages) ou connecte le repo à Vercel.

## Tester en local

```
npx serve .
```

puis ouvre l'adresse affichée dans le terminal.

## Note sur le compte à rebours

Il utilise l'heure locale de l'appareil qui ouvre le site — aucune configuration de fuseau horaire nécessaire.
