# TP Dev Avance - Application Node.js / Express

Application web avec authentification (signup/login), sessions, roles utilisateur et pages EJS.

## Stack
- Node.js
- Express
- EJS
- express-session
- Mongoose (MongoDB)
- bcrypt

## Fonctionnalites
- Inscription utilisateur (`/signup`)
- Connexion utilisateur (`/login`)
- Deconnexion (`/out`)
- Page d'accueil (`/`)
- Page `justePrix` protegee par middleware (`/justePrix`)
- Gestion des roles dans la navbar (`role 0`, `role 1`, `role 2`)

## Structure
- `app.js` : point d'entree (middlewares, sessions, montage des routes)
- `routes/` : declaration des routes HTTP
- `controllers/` : logique metier
- `model/` : schemas Mongoose
- `middleware/` : middlewares (auth)
- `views/` : templates EJS
- `public/` : assets statiques (CSS, images)

## Lancer le projet
1. Installer les dependances:
```bash
npm install
```
2. Configurer la connexion MongoDB dans `outils/database.js`.
3. Lancer le serveur:
```bash
node app.js
```
4. Ouvrir:
- `http://localhost:3000/`

## Routes principales
- `GET /` : accueil
- `GET /signup` : page inscription
- `POST /signup` : creation de compte
- `GET /login` : page connexion
- `POST /login` : authentification
- `GET /justePrix` : page protegee (utilisateur connecte)
- `GET /out` : deconnexion

## Session et roles
Variables de session utilisees:
- `req.session.isLog`
- `req.session.userId`
- `req.session.username`
- `req.session.role`

`res.locals` est alimente dans `app.js` pour les vues:
- `user`
- `role`
- `page_actuelle`

## Notes
- `outils/database.js` contient des informations sensibles (URI MongoDB): a ignorer dans Git (`.gitignore`).
- Le middleware `auth-midd.js` protege les routes qui necessitent une connexion.
