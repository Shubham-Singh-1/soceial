const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async (req,res) => {
    try{

        // likes/toggle/?id=abcdef&type=Post
        let likeable;
        let deleted=false;

        console.log(req.query)
        // Please donot auto complate the code it will take more time .What you want o do?
        //those are cpp codes...not related to the project ok got it 
        //one minute it giving error here 

        if(req.query.type == 'Post'){

            likeable = await Post.findById(req.query.id).populate('likes');


        }else{

            likeable = await Comment.findById(req.query.id).populate('likes');

        }
            // Is your user  authenticated?
            //yes...I think one who can login can like a post right?? Yep but it  let me have a looj
        // check if a like already exists
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id,
        });

        // if a Like already exists then  delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted = true;

        }else{
            // else make a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type,
            });

            likeable.likes.push(newLike);
            likeable.save();
        }

        return res.json(200,{
            message:'Request Successful!!',
            data: {
                deleted: deleted,
            }
        })

    }catch(err){
        console.log(err);
        return res.json(500,{
            message: 'Internal Server Error',
        })
    }
}
// See youare not sending query in the right way as you can see i orinted req.query and there is no id attribute i have fixeed it 
// Just let me refreash it 
// Its working fine now 
//thanks a lot :)