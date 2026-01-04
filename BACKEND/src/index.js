import express from "express";
import mongoose from"mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from"./routes/user.route.js";
import connectDB from"./db/db.js"
import notesRoutes from"./routes/note.route.js"
import passRouter from"./routes/pass.route.js"
import fileRouter from"./routes/files.route.js";
import aiRoute from"../src/AIassistant/ai.router.js"
import cron from "node-cron";


import { cleanUpLogic } from "./firebase/cleanUpLogic.js";
dotenv.config();
const app=express();
connectDB();

cron.schedule("*/2 * * * *", async () => { //in every 2 min forever...
  console.log("Running cleanup job...");
  await cleanUpLogic();
});

//middle ware
app.use(
   cors({
    origin: [
      "http://localhost:5173",
      "https://smartvault-omega.vercel.app",
      "https://smartvault-git-main-zaidxgithubs-projects.vercel.app",
     "https://smartvault-ezomq4reo-zaidxgithubs-projects.vercel.app",

    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }));

// app.options("*", cors());
app.use(express.json());

//routes
app.get("/",(req,res)=>{
    res.send("SmartVault API Running : ");
})

app.use("/api/user",userRoutes);
app.use("/api/notes",notesRoutes);
app.use("/api/passwords",passRouter)
app.use("/api/file",fileRouter);
app.use("/api/ai",aiRoute);

const PORT=process.env.PORT||5321;
app.listen(PORT,()=>console.log(`Application Running on the Port : ${PORT}`));
