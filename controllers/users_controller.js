const User = require('../models/user');
const { use } = require('passport');

//let's keep it same as before since no nesting levels and just one call back

module.exports.profile = ((req,res) => {
    User.findById(req.params.id ,(err,user) => {
        return res.render('user_controller' , {
            title:"User Profile",
            profile_user: user,
        });
    });
});

module.exports.update = (req,res) => {
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body ,(err,user) => {
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauhtorized');
    }
}

//render the sign up page
module.exports.signUp = ((req,res) => {

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title:"Codeial | Sign Up",
    });
});


//render the sign in page
module.exports.singIn = ((req,res) => {

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in' ,{
        title:"Codeila | Sign In",
    });
});


//get the sign up data
module.exports.create = ((req,res) => {
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email} ,(err,user) => {
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(req.body ,(err,user) => {
                if(err){
                    console.log('error in creating user while signing up');
                    return;
                }
               return res.redirect('/users/sign-in');

            });
        }
        else{
            return res.redirect('back');
        }
    });
});

//sign in and create session for the user
module.exports.createSession = ((req,res) => {
    return res.redirect('/')
});

module.exports.destroySession = ((req,res) => {
    req.logout();
    
    return res.redirect('/');
})