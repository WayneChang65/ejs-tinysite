'use strict';
require('dotenv').config();
const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const fmlog = require('@waynechang65/fml-consolelog').log;
const passport = require('passport');
const bcrypt = require('bcrypt');
const path = require('path');
const content = require('./content.json');
const sysmsg = require('./sysmsg.json');
const usersDB = require('./userdb.js');
const passport_config = require('./passport_conf.js');
const app = express();
const PORT = process.env.EJS_TINYSITE_POST || 8080;

passport_config.init(passport);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET || 'ejs-tinysite-secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.get('/', checkAuthenticated, (req, res) => {
    res.render('pages/index.ejs',
        content.find(item => item.pagename === 'index'));
});

app.get('/article', checkAuthenticated, (req, res) => {
    res.render('pages/article.ejs',
        content.find(item => item.pagename === 'article'));
});

app.get('/about', checkAuthenticated,  (req, res) => {
    res.render('pages/about.ejs',
        content.find(item => item.pagename === 'about'));
});

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('pages/register.ejs');
});

app.post('/register', checkNotAuthenticated, async (req, res) => {
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(req.body.inputPassword, 10);
        usersDB.addUser({
            id: Date.now().toString(),
            name: req.body.inputUserName,
            email: req.body.inputEmail,
            password: hashedPassword
        }).save();
        res.redirect('/login');
    } catch (error) {
        console.log(error);
        res.redirect('/register');
    }
    fmlog('sys_msg', ['REGISTOR', `User [${req.body.inputUserName}] has registered.  ` + 
    hashedPassword.substring(0, 30) + '...']);
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('pages/login.ejs');
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: 'login',
    failureFlash: true
}));

app.get('/img/*', (req, res) => {
    let fname = req.url.split('/').reduce((acu, currValue) => currValue);
    let options = {
        root: path.join(__dirname, 'img'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    switch (fname) {
        case 'cat.svg':
            res.sendFile(fname, options);
            break;
        default:
            res.status(403).send(sysmsg.NOT_ALLOW_TO_SEE);
            break;
    }
});

app.delete('/logout', (req, res) => {
    fmlog('sys_msg', ['LOGOUT', sysmsg.LOGOUT]);
    req.logOut();
    res.redirect('/login');
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

app.listen(PORT);
fmlog('sys_msg', ['EJS-TINYSITE', `Servre is running on port ${PORT}.`]);