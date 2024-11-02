import User from "../models/UsersModel.js";
import Post from "../models/PostsModel.js"
import Comment from "../models/CommentsModel.js";

export const activeCheck = async (req, res) => {
    return res.status(200).json({ message: "running" });
}

export const createPost = async (req, res) => {
    const { token } = req.body;

    try {
        const user = await User.findOne({ token: token });
        if (!user) return res.json({ message: "user not found " });

        const post = new Post({
            userId: user._id,
            body: req.body.body,
            media: req.file != undefined ? req.file.filename : "",
            fileType: req.file != undefined ? req.file.mimetype.split("/")[1] : ""
        })

        await post.save();
    } catch (err) {
        throw err;
    } 
}

export const getAllPost = async(req,res) =>{
    try{
        const posts= await Post.find().populate('userId', 'name username email profilePicture')
        return res.json({posts})
    }catch(err){
        throw err;
    }
}


export const deletePost = async(req,res)=>{
    const {token, postId} = req.body;

    try{
        let user = await User.findOne({token:token}).select("_id");
        if(!user) return res.json({message : "user does not exist"})
        
        let post = await Post.findOne({_id : postId});
        if(!post) return res.json({message:" post not found"});

        if( post.userId.toString() !== user._id.toString()){
            return res.json({message:"unauthorized"})
        }
        await Post.deleteOne({_id:postId})

    }catch(err){
        throw err;
    }
}

export const getCommentsByPost = async(req,res)=>{
    let {postId}= req.query;

    try{
        // let post = await Post.findOne({_id : postId});
        // if(!post) return res.json({message :"post does not exist"});


        // return res.json({comments : post.comments})

        const comments = await Comment.find({ postId }).populate('userId', 'name username'); // Populate user details if needed
        
        // Check if comments exist
        if (!comments.length) return res.json({ message: "No comments found for this post" });

        return res.json(comments.reverse());
    }catch(err){
        throw err;
    }
}

export const deleteCommentOfUser = async (req,res)=>{
    let {token, commentId} = req.body;
    try{
        let user =await User.findOne({token : token})
        if(!user) return res.json({message : "user does not exist"})

        let comment = await Comment.findOne({_id : commentId});
        if(!comment) return res.json({message :"comment does not exist"});

        if(comment.userId.toString() !== user._id.toString() ){
            return res.json({message : "not authorized"});
        }

        await Comment.deleteOne({"_id": commentId});
        return res.json({message :" deleted !"});
    }catch(err){
        throw err;
    }
}

export const incrementLikes = async(req,res)=>{
    let {post_Id} = req.body;
    try{
        let post = await Post.findOne({_id : post_Id});
        if(!post) return res.json({message : "post does not exist"});
        console.log("like was increased by 1");
        post.likes = post.likes+1;

        await post.save();
    }catch(err){
        throw err;
    }
}

