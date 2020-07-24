const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


//tell passport to use a new Strategy for google login
passport.use(new googleStrategy({
        clientID:"887059710083-7qv01snhqch4l85vii07ekrdv88chs5s.apps.googleusercontent.com",
        clientSecret:"V7BKN5nJHEdwinaT6FyGHwCG",
        callbackURL:"http://localhost:8000/users/auth/google/callback",
    },
    (accessToken,refresh,profile,done) => {
        //find user
        User.findOne({email:profile.emails[0].value}).exec( (err,user) => {
            if(err){
                console.log('error in google strategy-passport',err);
                return;
            }  
            console.log(profile);

            if(user){
                //if found, set this user as req.user
                done(null, user);
            }
            else{
                //if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                } ,(err,user) => {
                    if(err){
                        console.log('error in google strategy-passport',err);
                        return;
                    }  

                    return done(null,user);
                })
            }
        });
    }


));

module.exports = passport;