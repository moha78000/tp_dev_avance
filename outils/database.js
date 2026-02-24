const mongoose = require('mongoose');

const uri = 'mongodb://22302683:u5sytrv9@192.168.24.1:27017/22302683_db';

mongoose.connect(uri)
    .then(() => console.log("MongoDB connecté"))
    .catch(err => console.error(err));

module.exports = mongoose;