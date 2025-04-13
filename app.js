const express = require('express');
const port = 8890;
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const db = require('./configs/database');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const passport = require('./middleware/passport-local');
const flash = require("connect-flash");

// Middlewares - Correct order is IMPORTANT
app.use(session({
    secret: "jp",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 30
    }
}));


app.use(flash());
app.use(passport.session());
app.use(passport.initialize());
app.use(passport.userData);
app.use(passport.flashMSG);

// Static and body
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));
app.use(cookieParser());

// Routes
const Mainrouter = require('./routers');
app.use(Mainrouter);




// Server
app.listen(port, (err) => {
    if (!err) {
        db();
        console.log("Server is working on:\nhttp://localhost:" + port);
    }
});
