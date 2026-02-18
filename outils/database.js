const mongoose = require('mongoose');

const uri = 'mongodb://22302683:u5sytrv9@192.168.24.1:27017/22302683_db';

mongoose.connect(uri);

mongoose.connection.on('error', (err) => {
    console.log(err);
});

mongoose.connection.on('open', () => {
    console.log('Connexion réussie.');
});

module.exports = mongoose;