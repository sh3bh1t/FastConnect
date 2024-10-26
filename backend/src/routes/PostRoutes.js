import { Router } from "express";
import { activeCheck } from "../controllers/PostContoller.js";

const router=Router();

router.route('/').get(activeCheck);


export default router;