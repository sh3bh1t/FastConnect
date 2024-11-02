import { Router } from "express";
import { login, register, uploadProfilePicture, updateUserProfile, getUserAndProfile, updateProfileData, getAllUserProfiles,downloadUserResume, sendConnectionRequest, getMyConnectionRequests,  myConnectionsRequestsList, acceptConnectionRequest, getUserProfileAndUserBasedOnUsername } from "../controllers/UserController.js";
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

const upload = multer({ storage })
router.route("/update_profile_picture").post(upload.single('profilePicture'), uploadProfilePicture);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/user_update').post(updateUserProfile);
router.route('/update_profile_data').post(updateProfileData)
router.route('/get_user_and_profile').get(getUserAndProfile)
router.route('/user/get_all_users').get(getAllUserProfiles);
router.route('/user/download_resume').get(downloadUserResume);
router.route('/user/send_connection_request').post(sendConnectionRequest);
router.route('/user/get_connection_request').get(getMyConnectionRequests);
router.route('/user/user_connection_request').get(myConnectionsRequestsList);
router.route('/user/accept_connection_request').post(acceptConnectionRequest);
router.route('/user/get_profile_based_on_username').get(getUserProfileAndUserBasedOnUsername);


export default router;