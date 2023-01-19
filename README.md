# Facebook API Graph - Node.js + React.js
Projet permettant de récupérer des informations sur les post publiés sur une page facebook via [Graph API](https://developers.facebook.com/docs/graph-api/overview).

Le back-end de ce projet à été réalisé avec [Node.js](https://nodejs.org/fr/) et [Express.js](https://expressjs.com/fr/). 
Le front-end de l'application a été réalisé avec [React.js](https://fr.reactjs.org/) et [MUI](https://mui.com/).


## Prérequis
Pour faire fonctionner ce projet vous aurez besoin de modifier les 2 valeurs ci-dessous dans le fichier `api/.env`:
- [PAGE_ACCESS_TOKEN](https://developers.facebook.com/docs/pages/access-tokens/#obtenir-un-token-d-acc-s-de-page) - Insérer le Token d'accès à votre page facebook avec les autorisations correspondantes
- [PAGE_ID](https://developers.facebook.com/docs/pages/getting-started/#-tape-1---obtenir-l-id-de-votre-page) - Insérer l'id de votre page facebook

## Installation du projet
Clonez le projet sur votre ordinateur, ensuite éxecutez les commandes suivante :

Installation du serveur back-end:
```bash
cd api && npm install
# ou
cd api && yarn install
```

Installation du serveur front-end:
```bash
cd app && npm install
# ou
cd app && yarn install
```

## Démarrer le projet
Démarrage du serveur back-end:
```bash
cd api && npm run start
# ou
cd api && yarn start
```

Démarrage de votre serveur front-end:
```bash
cd app && npm run start
# ou
cd app && yarn start
```

Ouvrez [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir le résultat.