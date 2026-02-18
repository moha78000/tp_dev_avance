const mongoose = require('../outils/database');

const historiqueSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    nombreEssaye: Number,
    nombreSecret: Number,
    resultat: String,
    coupNumero: Number
}, { timestamps: true });

const Historique = mongoose.models.Historique || mongoose.model('Historique', historiqueSchema , 'historique');



module.exports = Historique;