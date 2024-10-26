import { Router } from "express";
import { activeCheck, createPost, getAllPost } from "../controllers/PostContoller.js";
import multer from "multer";

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
router.route("/post").get(getAllPost)


export default router;