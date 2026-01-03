import express from "express";
import { createNote,getNotes,deleteNote ,getNoteById, updateNote ,getAllNote} from "../controllers/note/note.controller.js";
import { verifyFirebaseUser} from "../middlewares/userMiddleware.js";
const router=express();

router.post("/",verifyFirebaseUser,createNote);
router.get("/",verifyFirebaseUser,getNotes)
router.delete("/:id",verifyFirebaseUser,deleteNote)
router.get("/:id",verifyFirebaseUser,getNoteById)
router.put("/:id",verifyFirebaseUser,updateNote);
export default router;