const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtracJWT = require('passport-jwt').ExtractJwt;


const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtracJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: 'codeial',
}


passport.use(new JWTStrategy(opts, (jwtPayLoad,done) =>{

    User.findById(jwtPayLoad._id ,(err,user) => {
        if(err){
            console.log('Error in finding user using JWT ');
            return;
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    });
} ));

module.exports = passport;