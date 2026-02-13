const express = require("express");
const port = 3000;
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const clientRoutes = require('./routes/client');
const adminData = require('./routes/admin')

app.listen(port, () => {
    console.log("Server Express est à l'écoute sur le port : " + port);
})

app.set("view engine", "ejs");
app.set("views", "views");


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminData.routes);
app.use(clientRoutes);

app.use((req,res,next) => {
    res.status(404).render('404',{ pageTitle: 'Not Found'});
})