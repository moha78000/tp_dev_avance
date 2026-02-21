const mongoose = require('../outils/database');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, enum: [0, 1], default: 0 } // 0=utilisateur normal, 1=admin web
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;