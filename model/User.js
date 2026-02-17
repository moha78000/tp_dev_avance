const mongoose = require('../outils/database');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 } // 0=utilisateur normal, 1=admin web, 2=admin système
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;