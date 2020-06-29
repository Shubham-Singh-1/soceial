const Post = require('../models/post');


module.exports.home = ((req,res) => {
    // console.log(req.cookies);
    // res.cookie('user_id' ,20);

    // Post.find({} , (err,posts) => {
    //     return res.render('home' , {
    //         title:"Codeial | Home",
    //         posts: posts,
    //     });
    // });

    //populate the user of each post
    Post.find({})
    .populate({path: 'user'})     //see to it later if needed to improve
    .populate({
        path: 'comments',
        populate : {
            path: 'user',
        }
    })
    .exec((err,posts) => {
        return res.render('home' , {
            title: "Codeial | Home",
            posts: posts,
        });
    });
});