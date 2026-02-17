const mongoose = require('mongoose');

const historiqueSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    nombreEssaye: Number,
    nombreSecret: Number,
    resultat: String,
    coupNumero: Number
}, { timestamps: true });

module.exports = mongoose.model('Historique', historiqueSchema);