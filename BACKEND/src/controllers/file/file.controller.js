
import express, { Router } from "express"
 import multer from "multer";
 import streamefier from "streamifier"
 import path, { resolve } from"path";
 import File from "../../models/file.model.js";
 import cloudinary from "../../config/cloudinary.js";
 const storage=multer.memoryStorage();
 const upload=multer({
    storage,
    limits:{fileSize:10*1024*1024} //10 mb max limit
 });
 import { logActivity } from "../../utils/activity.js";
const router=express.Router();
function resolveResourceType(file) {
  const mime = file.mimetype;

  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";

  // documents & everything else
  return "raw";
}


 export const uploadFile=async(req,res)=>{
   const file=req.file;
    if(!req.file) {
      return res.status(400).json({message:"No File Provided"});
   }
    const bufferStream=streamefier.createReadStream(req.file.buffer);

    const uploadOptions={
    //   resource_type:"raw",
        resource_type: resolveResourceType(file),

      folder:"SmartVault_uploads"

   };
   

    const uplaodStream=cloudinary.uploader.upload_stream(uploadOptions,async(error,result)=>{
        if(error){
            console.log("Cloudinary Error Occcured: ",error);
            return res.status(500).json({message:"Uplaod Failded ",error})
        }
      
       try {
           const ext=uploadOptions.format||path.extname(file.originalname).substring(1);


        const saved=await File.create({
      //   userId:"68e7627f25af7e0f274a6498",
        userId:req.user._id,
        filename:result.public_id.split("/").pop(),
        originalFilename: req.body.fileName,
        url:result.url,
        secure_url: result.secure_url,
        public_id: result.public_id,
        resource_type: result.resource_type,
        format:ext.toLowerCase(),
        bytes: result.bytes,
        folder: result.folder


        });

         await logActivity(
              req.user.id,
              "FILE_UPLOADED",
              "FILE MANAGER",
              { fileName: saved.originalFilename }
            );
        return res.status(200).json({success:true,file:saved,message:"File saved in DataBase Successfully"});

       } catch (dbError) {
         console.log(dbError);
        return res.status(500).json({message:"Database Saved Failed!",dbError})
       }

        
    })
    bufferStream.pipe(uplaodStream);
 }

export const getUserFile=async (req,res)=>{
   const uniqueId=req.user._id;

   try {
      const userFileDetails = await File.find({userId:uniqueId});
      if(!userFileDetails){
         console.log("databse file fetch failed :");
         return res.status(500).json({message:"Failed to fetch the files of the user from database"});
      }
      return res.status(200).json({success:true,
      data:userFileDetails
   });
   
   } catch (error) {
      console.log("Database error:",error);
      return res.status(500).json({message:"Interneal Servel Error At DB"});
      
   }

 }

export const getFileStats=async(req,res)=>{
   const UserId=await req.user._id;

   try {

const stats = await File.aggregate([
  { $match: { userId:UserId } },
  {
    $group: {
      _id: "$userId",
      totalFiles: { $sum: 1 },
      totalBytes: { $sum: "$bytes" },
      totalImages: {
        $sum: {
          $cond: [
            { $in: ["$format", ["jpg", "jpeg", "png", "webp","gif"]] },
            1,
            0
          ]
        }
      },
      totalDocuments: {
        $sum: {
          $cond: [{ $in: ["$format", ["doc", "docx", "txt","pdf","ppt","pptx"]] }, 1, 0]
        }
      },

      totalSpreadSheets: {
        $sum: {
          $cond: [{ $in: ["$format", ["csv","xls","xlsx"]] }, 1, 0]
        }
      },
      totalVideos: {
        $sum: {
          $cond: [{ $in: ["$format", ["mp4","mkv","webm",]] }, 1, 0]
        }
      },
      totalAudios: {
        $sum: {
          $cond: [{ $in: ["$format", ["mp3", "mov", "avi","wav","recordings"]] }, 1, 0]
        }
      },
      totalOthers: {
        $sum: {
          $cond: [{ $in: ["$format", ["zip","rar", "unknown"]] }, 1, 0]
        }
      }
    }
  }
]);



if(!stats){
   console.log("error getting stats from db");
   return res.status(500).json({message:"Error getting stats from db:",
      success:false
   })
}


// Format result for easy access
const formattedStats = stats[0] || {
  totalFiles: 0,
  totalBytes: 0,
  totalImages: 0,
  totalPDFs: 0,
  totalDocuments: 0,
  totalVideos: 0
};

 return res.status(200).json({
   success:true,
   formattedStats
 })

      
   } catch (error) {
      console.log("error",error)
      
   }
 
 }

export const deleteFile=async(req,res)=>{

  const publicId=req.body.currentFilePublicId;
  const type=req.body.resourceType;

  const fileDoc = await File.findOne({ public_id: publicId, resource_type: type });
if (!fileDoc) return res.status(404).json({ message: "File not found in DB" });

  const result =await cloudinary.uploader.destroy(publicId,{
    resource_type:`${type}`,
    invalidate:true
  })
  
  if(result.ok) return res.status(500).json({message:"File Could Not be  deleted"});

  const dbResult= await File.deleteOne({public_id:publicId,resource_type:type});

  if(!dbResult.acknowledged){
    console.log("file not deleted from the database");
    return res.status(500).json({message:"File Deleted From Cloud But not from Database!"});

  }


  await logActivity(
              req.user.id,
              "FILE_DELETED",
              "FILE MANAGER",
              { fileName: fileDoc.originalFilename||fileDoc.filename }
            );
  // console.log("Db Result is::",dbResult);
  return res.status(200).json({message:"File Deleted SuccessFully", success:true})

 }


export default router;
