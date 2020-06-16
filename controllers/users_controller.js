module.exports.profile = ((req,res) => {
    return res.render('user_controller' , {
        title:"User Profile",
    })
});