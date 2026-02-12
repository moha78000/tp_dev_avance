const express = require("express");
const port = 3000;
const app = express();
const bodyParser = require("body-parser");

const adminRoutes = require('./routes/admin');
const clientRoutes = require('./routes/client');

app.listen(port, () => {
    console.log("Server Express est à l'écoute sur  port : " + port);
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(adminRoutes);
app.use(clientRoutes);