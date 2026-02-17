const mongoose = require('mongoose');

const uri = 'mongodb+srv://moh78078000:Mohamedkhaldi@cluster1.satxusx.mongodb.net/bd_sae';

mongoose.connect(uri);

mongoose.connection.on('error', (err) => {
    console.log(err);
});

mongoose.connection.on('open', () => {
    console.log('Connexion réussie.');
});

module.exports = mongoose;