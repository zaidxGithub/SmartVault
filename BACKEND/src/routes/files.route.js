import express, { Router } from "express"
 import multer from "multer";
import verifyFirebaseUser from "../middlewares/userMiddleware.js"
 const storage=multer.memoryStorage();
 const upload=multer({
    storage,
    limits:{fileSize:10*1024*1024} //10 mb max limit
 });
import {getUserFile,getFileStats,deleteFile ,uploadFile} from "../controllers/file/file.controller.js";
 const router=express.Router();
//api/uploadd

 router.post("/",verifyFirebaseUser,upload.single('file'),uploadFile)
 router.get("/",verifyFirebaseUser,getUserFile)
 router.get("/filestats",verifyFirebaseUser,getFileStats)
 router.delete("/",verifyFirebaseUser,deleteFile)

 export default router;