import User from "../models/UsersModel.js";
import Post from "../models/PostsModel.js";


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