const express = require("express");
const port = 3000;
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

const error404 = require('./controllers/error404');
const clientRoutes = require('./routes/client');
const adminRoutes = require('./routes/admin')
const authRoutes = require('./routes/auth');
const navControler = require('./controllers/navControler');
const outRoutes = require('./routes/logout');
const justePrixRoutes = require('./routes/justePrix');


app.listen(port, () => {
    console.log("Server Express est à l'écoute sur le port : " + port);
})

app.set("view engine", "ejs");
app.set("views", "views");


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret: 'secret',resave: false, saveUninitialized: false}));

app.use((req, res, next) => {
    res.locals.user = req.session.isLog
        ? {
            loggedIn: true,
            username: req.session.username
        }
        : null;

    res.locals.role = req.session.role ?? 0;
    res.locals.page_actuelle = req.path;

    next();
});

app.use('/', authRoutes);

app.use('/admin',adminRoutes);

app.use(justePrixRoutes);
app.use(clientRoutes);

//app.use('/', navControler);

app.use(outRoutes.routes);

app.use(error404.getError404);