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

module.exports.update = async (req,res) => {
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body ,(err,user) => {
    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('Unauhtorized');
    // }
    if(req.user.id == req.params.id){
        try{
            let user = await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req,res,function(err) {
                if(err){
                    console.log('*******Multer error: ',err);
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    //this is saving the path of a uploaded file into the avatar feild in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }

    }else{
        req.flash('error','Unauthorized!');
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
    req.flash('success','Logged in Successfully');
    return res.redirect('/')
});

module.exports.destroySession = ((req,res) => {
    req.logout();
    req.flash('success','You have logged out!');
    return res.redirect('/');
})