import { Router } from "express";
import { activeCheck, createPost, deleteCommentOfUser, deletePost, getAllPost, getCommentsByPost, incrementLikes } from "../controllers/PostContoller.js";
import multer from "multer";
import { commentPost } from "../controllers/UserController.js";

const router=Router();


const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename : (req,file,cb)=>{
        cb(null,file.originalname)
    },
})

const upload = multer({storage : storage})

router.route('/').get(activeCheck);

router.route("/post").post(upload.single('media'),createPost)
router.route("/posts").get(getAllPost)
router.route("/delete_post").delete(deletePost);
router.route("/comment").post(commentPost);
router.route("/get_comments").get(getCommentsByPost);
router.route("/delete_comment").delete(deleteCommentOfUser);
router.route("/increment_post_likes").post(incrementLikes);

export default router;