const passport = require('passport');
const User = require('../model/adminAuthModel');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        let user = await User.findOne({ username });

        if (user) {
            if (user.password === password) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } else {
            return done(null, false)
        }
    } catch (error) {
        return done(error, false);
    }
}));


passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        let user = await User.findById(id);
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
});

passport.userData = (req, res, next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return next();
}

passport.flashMSG = (req, res, next) => {
    res.locals.flash = {
        success: req.flash("success"),
        error: req.flash("error"),
    }
    next();
}

module.exports = passport;
