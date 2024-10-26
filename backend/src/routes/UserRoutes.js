import { Router } from "express";
import { login, register, uploadProfilePicture, updateUserProfile, getUserAndProfile, updateProfileData, getAllUserProfiles,downloadUserResume } from "../controllers/UserController.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })
router.route("/update_profile_picture").post(upload.single('profile_picture'), uploadProfilePicture);

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/user_update').post(updateUserProfile);
router.route('/get_user_and_profile').get(getUserAndProfile)
router.route('/update_profile_data').get(updateProfileData)
router.route('/user/get_all_users').get(getAllUserProfiles);
router.route('/user/download_resume').get(downloadUserResume);
export default router;