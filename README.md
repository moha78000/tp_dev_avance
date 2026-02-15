# 📦 TP Dev Avancé - Application E-commerce Node.js/Express

## 🎯 Vue d'ensemble du projet

Il s'agit d'une **application web e-commerce** construite avec **Node.js** et **Express.js**. L'application permet de :
- Afficher une liste de produits (boutique)
- Ajouter des produits (réservé aux administrateurs authentifiés)
- Gérer des sessions utilisateur

---

## 📁 Structure du projet

```
tp_dev_avance/
├── app.js                 # Point d'entrée principal
├── package.json           # Dépendances du projet
├── controllers/           # Logique métier
│   ├── navControler.js   # Contrôleur de navigation
│   └── error404.js       # Gestion erreur 404
├── routes/               # Définition des routes
│   ├── client.js         # Routes publiques
│   ├── admin.js          # Routes admin
│   ├── auth.js           # Routes authentification
│   └── logout.js         # Route déconnexion
├── model/                # Modèles de données
│   └── dataProduits.js   # Gestion des produits
├── views/                # Templates EJS
│   ├── boutique.ejs      # Page boutique
│   ├── ajout.ejs         # Formulaire ajout produit
│   ├── 404.ejs           # Page erreur
│   └── fragments/        # Composants réutilisables
│       ├── head.ejs      # En-tête HTML
│       ├── navigation.ejs # Menu navigation
│       └── foot.ejs      # Pied de page
├── middleware/           # Middlewares personnalisés
│   └── auth-midd.js      # Middleware authentification
├── public/               # Ressources statiques
│   └── css/              # Feuilles de style
└── node_modules/         # Dépendances installées
```

---

## 🔧 Technologies utilisées

### Backend
- **Node.js** : Environnement JavaScript côté serveur
- **Express.js v5.2.1** : Framework web minimaliste
- **Express-session v1.19.0** : Gestion des sessions

### Frontend
- **EJS (Embedded JavaScript) v4.0.1** : Moteur de templates
- **CSS** : Stylisation basique

### Outils
- **body-parser** : Parse les données de formulaire (intégré à Express)
- **path** : Manipulation des chemins de fichiers

---

## 📄 Explication fichier par fichier

### 1. **app.js** - Point d'entrée principal

```javascript
const express = require("express");
const port = 3000;
const app = express();
```
- Initialise Express sur le port 3000
- Configure le serveur pour écouter les requêtes HTTP

```javascript
app.set("view engine", "ejs");
app.set("views", "views");
```
- Définit EJS comme moteur de templates
- Indique que les vues sont dans le dossier `views/`

```javascript
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret: 'secret',resave: false, saveUninitialized: false}));
```
- **bodyParser** : Parse les données POST des formulaires
- **express.static** : Sert les fichiers statiques (CSS, images)
- **session** : Active les sessions (stockage côté serveur des données utilisateur)

```javascript
app.use('/', authRoutes);
app.use('/admin',adminRoutes);
app.use(clientRoutes);
app.use(outRoutes.routes);
app.use(error404.getError404);
```
- Enregistre les routes dans l'ordre de priorité
- La route 404 est en dernier (catch-all)

---

### 2. **routes/client.js** - Routes publiques

```javascript
router.get('/',navControler.getBoutique);
```
- **Route** : `GET /`
- **Action** : Affiche la page boutique (accessible à tous)
- **Contrôleur** : `navControler.getBoutique`

---

### 3. **routes/admin.js** - Routes administrateur

```javascript
router.get('/ajout',isAuth,navControler.getAjoutProduits);
```
- **Route** : `GET /admin/ajout`
- **Middleware** : `isAuth` (vérifie si l'utilisateur est connecté)
- **Action** : Affiche le formulaire d'ajout de produit
- **Contrôleur** : `navControler.getAjoutProduits`

```javascript
router.post('/ajout',navControler.postAjoutProduit);
```
- **Route** : `POST /admin/ajout`
- **Action** : Traite le formulaire et ajoute le produit
- **Contrôleur** : `navControler.postAjoutProduit`

---

### 4. **routes/logout.js** - Déconnexion

```javascript
router.get('/out', (req, res, next) => {
    if (req.session.isLog) {
        req.session.destroy();
        res.redirect("/");
    }
});
```
- **Route** : `GET /out`
- **Action** : Détruit la session et redirige vers la boutique

---

### 5. **controllers/navControler.js** - Logique métier

#### `getAjoutProduits()`
```javascript
exports.getAjoutProduits = (req,res,next) => {
    if (!req.session.isLog) {
        return res.redirect('/auth');
    } else {
        res.render('ajout',{pageTitle:"Ajout admin"});
    }
}
```
- Vérifie si l'utilisateur est connecté (`req.session.isLog`)
- Si non → redirige vers `/auth`
- Si oui → affiche le formulaire d'ajout

#### `postAjoutProduit()`
```javascript
exports.postAjoutProduit = (req,res,next) => {
    const produit = new Produit(req.body.produit);
    produit.save();
    res.redirect('/');
}
```
- Récupère le nom du produit depuis `req.body.produit`
- Crée une nouvelle instance de `Produit`
- Sauvegarde le produit
- Redirige vers la boutique

#### `getBoutique()`
```javascript
exports.getBoutique = (req,res,next) => {
    const produits = Produit.fetchAll();
    res.render('boutique',{pageTitle:"Boutique",listeProduits: produits});
}
```
- Récupère tous les produits
- Passe la liste à la vue `boutique.ejs`

---

### 6. **model/dataProduits.js** - Modèle de données

```javascript
const produits = [];

module.exports = class Produit{
    constructor(produit){
        this.produit = produit;
    }

    save(){
        produits.push(this);
    }

    static fetchAll(){
        return produits;
    }
}
```

**Fonctionnement** :
- `produits = []` : Tableau en mémoire (données perdues au redémarrage)
- `constructor(produit)` : Crée un nouvel objet produit
- `save()` : Ajoute le produit au tableau
- `fetchAll()` : Retourne tous les produits (méthode statique)

⚠️ **Limitation** : Les données sont stockées en RAM, donc perdues au redémarrage du serveur.

---

### 7. **views/boutique.ejs** - Page boutique

```html
<%- include('fragments/head.ejs')%>
</head>
<body>
<%- include('fragments/navigation.ejs')%>

<main>
    <h1>Liste des produits</h1>
    <p>Bienvenue sur ma boutique</p>
    <% if (listeProduits.length ==0) {%>
        <p>Il n'y a pas de produits</p>
    <% } else { %>
    <ul>
        <% for (let prod of listeProduits) { %>
            <li><%= prod.produit%></li>
        <% }} %>
    </ul>
</main>
<%- include('fragments/foot.ejs')%>
```

**Syntaxe EJS** :
- `<%- ... %>` : Inclusion de fichiers (sans échappement HTML)
- `<% ... %>` : Code JavaScript (conditions, boucles)
- `<%= ... %>` : Affichage de variables (avec échappement HTML)

**Logique** :
- Si aucun produit → affiche "Il n'y a pas de produits"
- Sinon → boucle sur `listeProduits` et affiche chaque produit

---

### 8. **views/ajout.ejs** - Formulaire d'ajout

```html
<form method="POST" action="/admin/ajout">
    <label for="produit">Produit</label>
    <input type="text" name="produit" id="produit">
    <button type="submit">Ajouter</button>
</form>
```

- **method="POST"** : Envoie les données en POST
- **action="/admin/ajout"** : Cible la route POST définie dans `admin.js`
- **name="produit"** : Nom du champ (accessible via `req.body.produit`)

---

### 9. **views/fragments/** - Composants réutilisables

#### head.ejs
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title><%= pageTitle %></title>
    <link rel="stylesheet" href="/css/boutique.css">
```
- Template du `<head>` HTML
- `<%= pageTitle %>` : Variable dynamique passée depuis le contrôleur

#### navigation.ejs
```html
<header>
    <h1>e-commerce</h1>
    <nav>
        <ul>
            <li><a href="/">Boutique</a></li>
            <li><a href="/admin/ajout">Ajout</a></li>
        </ul>
    </nav>
</header>
```
- Menu de navigation commun à toutes les pages

#### foot.ejs
```html
</body>
</html>
```
- Fermeture des balises HTML

---

## 🔐 Système d'authentification

### Middleware auth-midd.js (incomplet dans le projet)

**Fichier actuel** :
```javascript
const adminData = require("../routes/admin");
```
⚠️ **Ce fichier est vide !** Il devrait contenir :

```javascript
module.exports = (req, res, next) => {
    if (!req.session.isLog) {
        return res.redirect('/auth');
    }
    next();
};
```

### Gestion des sessions

Dans `app.js` :
```javascript
app.use(session({
    secret: 'secret',           // Clé de chiffrement (à changer en prod !)
    resave: false,              // Ne pas sauvegarder si non modifié
    saveUninitialized: false    // Ne pas créer de session vide
}));
```

**Variables de session** :
- `req.session.isLog` : Booléen indiquant si l'utilisateur est connecté
- Stockée côté serveur (en mémoire par défaut)

---

## 🚀 Comment lancer le projet

### 1. Installation des dépendances
```bash
npm install
```

### 2. Lancer le serveur
```bash
node app.js
```
Ou avec nodemon (redémarrage automatique) :
```bash
npm install -g nodemon
nodemon app.js
```

### 3. Accéder à l'application
```
http://localhost:3000/
```

---

## 🔄 Flux de l'application

### Scénario 1 : Visiteur consulte la boutique
1. **GET /** → `clientRoutes` → `navControler.getBoutique()`
2. Récupère tous les produits via `Produit.fetchAll()`
3. Rendu de `boutique.ejs` avec la liste des produits

### Scénario 2 : Admin ajoute un produit
1. **GET /admin/ajout** → `adminRoutes` → Middleware `isAuth`
2. Si non connecté → redirige vers `/auth`
3. Si connecté → affiche `ajout.ejs`
4. **POST /admin/ajout** → `navControler.postAjoutProduit()`
5. Crée un nouveau `Produit` et le sauvegarde
6. Redirige vers `/` (boutique)

### Scénario 3 : Déconnexion
1. **GET /out** → `outRoutes`
2. Détruit la session via `req.session.destroy()`
3. Redirige vers `/`

---

## ⚠️ Problèmes identifiés

### 1. **Middleware d'authentification vide**
Fichier `middleware/auth-midd.js` incomplet → Erreur si utilisé

### 2. **Stockage en mémoire**
Les produits sont stockés dans un tableau en RAM → perdus au redémarrage

**Solution** : Utiliser une base de données (MongoDB, MySQL, PostgreSQL)

### 3. **Pas de système de login**
Le fichier `routes/auth.js` contient du code incorrect :
```javascript
if (!req.session.isLog) {
    console.log("Non authentifié");
    return res.redirect('/auth');
}
```
Ce n'est pas une route, c'est du code de contrôleur mal placé.

**Il devrait contenir** :
```javascript
const express = require("express");
const router = express.Router();

router.get('/auth', (req, res) => {
    res.render('login', {pageTitle: "Connexion"});
});

router.post('/auth', (req, res) => {
    // Vérifier identifiants
    if (req.body.username === 'admin' && req.body.password === 'password') {
        req.session.isLog = true;
        res.redirect('/admin/ajout');
    } else {
        res.redirect('/auth');
    }
});

module.exports = router;
```

### 4. **Sécurité**
- Secret de session en clair : `secret: 'secret'`
- Pas de hash des mots de passe
- Pas de protection CSRF
- Session stockée en mémoire (perdue au redémarrage)

---

## 🎓 Concepts clés expliqués

### 1. **Architecture MVC (Model-View-Controller)**
- **Model** (`model/dataProduits.js`) : Gestion des données
- **View** (`views/*.ejs`) : Interface utilisateur
- **Controller** (`controllers/navControler.js`) : Logique métier

### 2. **Middleware**
Fonctions intermédiaires entre la requête et la réponse :
```javascript
app.use((req, res, next) => {
    console.log("Requête reçue");
    next(); // Passe au middleware suivant
});
```

### 3. **Routing**
Correspondance URL → Fonction :
```javascript
router.get('/admin/ajout', middleware, controller);
//       ↑ Méthode  ↑ Route  ↑ Fonction    ↑ Fonction
```

### 4. **Sessions**
Stockage de données côté serveur lié à un cookie client :
```javascript
req.session.isLog = true; // Stocké sur le serveur
// Cookie envoyé au client : connect.sid=abc123
```

### 5. **Template Engine (EJS)**
Génère du HTML dynamique avec JavaScript :
```html
<% const name = "Alice"; %>
<p>Bonjour <%= name %></p>
<!-- Résultat : <p>Bonjour Alice</p> -->
```

---

## 📊 Diagramme de flux

```
Client (Navigateur)
       ↓
  [GET /]
       ↓
   app.js → clientRoutes
       ↓
  navControler.getBoutique()
       ↓
  Produit.fetchAll()
       ↓
  boutique.ejs (rendu)
       ↓
   HTML renvoyé
       ↓
  Client (Affichage)
```

---

## 🔮 Améliorations possibles

### Court terme
1. **Corriger le middleware d'authentification**
2. **Créer une vraie page de login**
3. **Ajouter des vues pour les erreurs**

### Moyen terme
1. **Intégrer une base de données** (MongoDB avec Mongoose)
2. **Ajouter la gestion des utilisateurs** (inscription, rôles)
3. **Implémenter la suppression/modification de produits**

### Long terme
1. **Système de paiement**
2. **Panier d'achat**
3. **Gestion des commandes**
4. **Dashboard administrateur complet**
5. **API REST pour une app mobile**

---

## 📚 Ressources pour aller plus loin

- **Documentation Express** : https://expressjs.com/
- **Documentation EJS** : https://ejs.co/
- **Tuto Node.js** : https://nodejs.dev/learn
- **Express Session** : https://github.com/expressjs/session
- **Architecture MVC** : https://developer.mozilla.org/fr/docs/Glossary/MVC

---

## 🎯 Résumé ultra-rapide

**Qu'est-ce que c'est ?**
Une boutique en ligne basique avec gestion de produits.

**Technologies ?**
Node.js + Express + EJS + Sessions

**Fonctionnalités ?**
- Afficher des produits
- Ajouter des produits (admin)
- Système de session (incomplet)

**Problèmes ?**
- Authentification non fonctionnelle
- Données perdues au redémarrage
- Pas de base de données

**À retenir ?**
Bon exemple pour comprendre Express et le pattern MVC, mais nécessite des corrections et une base de données pour être utilisable en production.