const express = require("express");
const port = 3000;
const app = express();

app.listen(port, () => {
    console.log("Server Express est à l'écoute sur  port : " + port);
})

app.use('/ajout',(req,res,next) => {
    console.log('middleware ajout', req.method);
    res.send("<h1>La page web d'ajout</h1>");
})


app.use('/',(req,res,next) => {
    console.log('middleware racine', req.method);
    res.send("<h1>Ma page web</h1>");
})