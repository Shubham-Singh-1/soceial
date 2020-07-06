const passport =  require('passport');

const LocalStatergy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStatergy({
        usernameField: 'email',
        passReqToCallback: true, // this basically allows us to set the first argument to the callback function as req
    },
    (req, email , password , done) => {
        //find a user and establish the identity
        User.findOne({email: email} ,(err,user) => {
            if(err){
                req.flash('error', err);
                return done(err);
            }
            
            if(!user || user.password!=password){
                req.flash('error','Invalid Username/Password');
                return done(null , false);
            }

            return done(null , user);
        });
    }

));


//serialise the user to decide which key to be kept in the cookies
passport.serializeUser((user,done) => {
    done(null,user.id);
});


//deserialising the user from the key in the cookies
passport.deserializeUser((id,done) => {
    User.findById(id,(err,user) => {
        if(err){
            console.log('Error in finding user --->Passport');
            return done(err);
        }

        return done(null, user);
    });
});

passport.checkAuthentication = ((req,res,next) => {
    //if the user is signed in,then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    res.redirect('/users/sign-in');

});

passport.setAuthenticatedUser = ((req,res,next) => {
    if(req.isAuthenticated()){
        // req.user contains the currernt signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
});

module.exports = passport;