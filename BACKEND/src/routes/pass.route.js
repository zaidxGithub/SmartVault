import express from "express";
import verifyFirebaseUser from "../middlewares/userMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createPassword ,getAllPassword ,deletePassword, getPassStats} from "../controllers/password/password.controller.js";
import { Router } from "express";
const router=express.Router();
router.post("/",verifyFirebaseUser,createPassword);
router.get("/",verifyFirebaseUser,getAllPassword);
router.get("/stats",verifyFirebaseUser,getPassStats)
router.delete("/:id",verifyFirebaseUser,deletePassword);

export default router;