# TP Dev Avance - Application Node.js / Express

Application web avec authentification (signup/login), sessions, roles utilisateur et pages EJS.

## Stack
- Node.js
- Express
- EJS
- express-session
- Mongoose (MongoDB)
- bcrypt

## Structure du projet

- `app.js` : point d’entrée (middlewares, sessions, routes)
- `routes/` : définition des routes
- `controllers/` : logique applicative
- `middleware/` : contrôle d’accès (auth / admin)
- `model/` : modèles Mongoose
- `views/` : templates EJS
- `public/` : CSS, images et assets
- `outils/` : Connexion BDD

## Fonctionnalités

- Inscription utilisateur (`/signup`)
- Connexion (`/login`)
- Déconnexion (`/out`)
- Page d’accueil (`/`)
- Jeu **Le Juste Prix** protégé (`/justePrix`)
- Espace admin :
  - création de comptes (`/admin/signupadmin`)
  - historique des comptes (`/admin/historiqueconnexion`)
  - suppression d’un utilisateur

## Gestion des rôles

- **Invité (non connecté)** : accès aux pages de connexion et d'inscription
- **Rôle 0** : utilisateur standard (accès au jeu)
- **Rôle 1** : administrateur web (accès routes admin)