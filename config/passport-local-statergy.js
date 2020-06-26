const passport =  require('passport');

const LocalStatergy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStatergy({
        usernameField: 'email'
    },
    (email , password , done) => {
        //find a user and establish the identity
        User.findOne({email: email} ,(err,user) => {
            if(err){
                console.log('Error in finding user --->Passport');
                return done(err);
            }
            
            if(!user || user.password!=password){
                console.log('Invalid Username/Password');
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

module.exports = passport;