module.exports.profile = ((req,res) => {
    return res.render('user_controller' , {
        title:"User Profile",
    })
});

//render the sign up page
module.exports.signUp = ((req,res) => {
    return res.render('user_sign_up', {
        title:"Codeial | Sign Up",
    });
});


//render the sign in page
module.exports.singIn = ((req,res) => {
    return res.render('user_sign_in' ,{
        title:"Codeila | Sign In",
    });
});