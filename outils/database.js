const mongoose = require('mongoose');

// URI de connexion
const uri = 'mongodb+srv://moh78078000:Mohamedkhaldi@cluster1.satxusx.mongodb.net/bd_test';

// Connexion à MongoDB
mongoose.connect(uri);

mongoose.connection.on('error', (err) => {
    console.log(err);
});

mongoose.connection.on('open', () => {
    console.log('Connexion réussie.');
});

// Votre collection 22....
// Exemple d'un schéma
const produitSchema = new mongoose.Schema({
    nom: {
        type: String
    },
    prixu: {
        type: Number// Double = Number en JavaScript
    },
    origine: {
        type: String
    }
});

// Modèle basé sur la collection "produit"
const Produit = mongoose.model('Produit' , produitSchema, 'produit');

    console.log(Produit);

    // Fonction pour récupérer tous les produits
    async function getProduits() {
        try {
        const produits = await Produit.find({});
        console.log("Liste des produits :", produits);
    } catch (error) {
        console.error("Erreur lors de la récupération :", error);
    } finally {
        mongoose.connection.close();
    }
    }


    async function insererProduit() {
        try {
        const nouveauProduit = new Produit({
        nom: "Banane",
        prixu: 2.50,
        origine: "Cameroun"
    });

        const resultat = await nouveauProduit.save();
        console.log("Produit inséré :", resultat);
    } catch (error) {
        console.error("Erreur lors de l'insertion :", error);
    }
    }
    // Appel des fonctions
    getProduits();
    insererProduit();