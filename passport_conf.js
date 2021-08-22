'use strict';
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const fmlog = require('@waynechang65/fml-consolelog').log;
const sysmsg = require('./sysmsg.json');
const usersDB = require('./userdb.js');

function _init(passport) {
    const authenticateUser = async (email, password, done) => {
        const user = usersDB.getUserByEmail(email);
        if (user == null) {
            fmlog('error_msg', ['NO USER ACCOUNT', sysmsg.NO_USER_ACCOUNT, '']);
            return done(null, false, {
                message: sysmsg.NO_USER_ACCOUNT
            });
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                fmlog('sys_msg', ['LOGIN', sysmsg.LOGIN_OK]);
                return done(null, user);
            } else {
                fmlog('error_msg', ['WORNG PASSWORD', sysmsg.WRONG_PASSWORD, '']);
                return done(null, false, {
                    message: sysmsg.WRONG_PASSWORD
                });
            }
        } catch (err) {
            fmlog('error_msg', ['EJS-TINYSITE', '', err]);
            return done(err);
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, 
        authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => done(null, usersDB.getUserById(id)));
}

module.exports = {
    init: _init
};

