import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Download,
  Eye,
  Trash2,
  LoaderCircle,
  X
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { handleDeleteAPI,handleDownloadAPI } from "../../../services/fileapi";

import { AiFillFilePdf, AiFillFileImage, AiOutlineVideoCamera, AiFillFilePpt } from "react-icons/ai";
import { FaFileAlt, FaFileArchive, FaFileCsv, FaFilePowerpoint } from "react-icons/fa";


const FileCard = ({ file, viewType, type ,onDeleteSuccess}) => {

  const[isDeleting,setIsDeleting]=useState(false);
  const[preview,setPreview]=useState(false);
  const resourceType = file.resource_type;
  const getFileIcon = (file) => {
  const resource_type = (file.resource_type ?? "").toLowerCase();
  const format = (file.format ?? "").toLowerCase();


  // PDFs
  if ((resource_type === "raw" && format === "pdf") || format === "pdf") {
    return AiFillFilePdf;
  }

  // Images
  if (resource_type === "image" && ["jpeg", "jpg", "png", "gif", "webp"].includes(format)) {
    return AiFillFileImage;
  }

  // Videos
  if (resource_type === "video" && ["mp4", "mov", "webm", "mkv"].includes(format)) {
    return AiOutlineVideoCamera;
  }

  // Documents (Word, PPT, Excel)
  if (resource_type === "raw" && ["doc", "docx", "xls", "xlsx"].includes(format)) {
    return FaFileAlt;
  }
  // txt
  if (resource_type === "raw" && ["txt"].includes(format)) {
    return FaFileArchive;
  }
  if (resource_type === "raw" && ["ppt","pptx"].includes(format)) {
    return FaFilePowerpoint;
  }

  // Fallback for other files
  return FaFileAlt;
};



  const getFileTypeColor=(file)=>{
    const resource_type=file.resource_type;
    const format=file.format;
    
    if (resource_type === "raw" && format === "pdf") {
    return "text-red-400 bg-red-900/40";
  }

  // Images
  if (resource_type === "image" && ["jpeg", "jpg", "png", "gif", "webp"].includes(format)) {
    return "text-emerald-400 bg-emerald-900/40";
  }

  // Videos
  if (resource_type === "video" && ["mp4", "mov", "webm", "mkv"].includes(format)) {
    return "text-violet-400 bg-violet-900/40";
  }

  // Documents (Word, PPT, Excel)
  if (resource_type === "raw" && ["doc", "docx", "xls", "xlsx"].includes(format)) {
    return "text-blue-400 bg-blue-900/40";
  }
  // Documents (Word, PPT, Excel)
  if (resource_type === "raw" && ["ppt","pptx"].includes(format)) {
    return "text-orange-400 bg-orange-900/60";
  }

  // Other raw files
  if (resource_type === "raw") {
    return "text-gray-400 bg-gray-500/40";
  }

  // Fallback
  return "text-pinkray-500 bg-gray-800/40";
  }


  
  const Icon = getFileIcon(file);
  const colorClass = getFileTypeColor(file);



  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };



const showPreview=()=>{
setPreview(true);
}

const handleDeleteFile=async(file)=>{

    setIsDeleting(true);
   const response=await handleDeleteAPI(file);

   if(!response.success){
    toast.error("failed to delete the file")
    toast.error(response.message);
   }
   toast.success("file deleted")
   setIsDeleting(false);
   onDeleteSuccess();

}


const handleDownloadFile=async(file)=>{
 try {
   const result=await handleDownloadAPI(file);
  
   if(!result.success){
  
    toast.error("file cant be downlaoded!")
   }
    else{
       toast.success("file downlaoding...")
    }
   
 } catch (error) {
   toast.error("file cant be downladed...")
  
 }
  

}



if (viewType === "list") {
  return (
    <div className="bg-[var(--card)] rounded-xl shadow-lg shadow-blue-900/20 transition-all p-4 border border-[var(--border)]">
        <ToastContainer
            position="top-center"
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick={true}
            pauseOnFocusLoss
            draggable
           theme={document.documentElement.classList.contains("dark") ? "dark" : "light"} 
           

          />
      <div className="flex items-center space-x-4">
        <div
          className={`w-12 h-12 rounded-lg flex overflow-hidden items-center justify-center ${colorClass}`}
        >
          <img src={file.url} alt="" />
          <Icon className="w-6 h-6" />
        </div>

        <div className="flex-1 min-w-0">
          <Link to={`/file/${file._id}`} className="block">
            <h3 className="font-medium text-[var(--foreground)] truncate  transition-colors">
              {file.originalFilename}
            </h3>
          </Link>
          <div className="flex items-center space-x-4 mt-1 text-sm text-[var(--muted-foreground)]">
            <span>{formatFileSize(file.bytes)}</span>
            <span>{formatDate(file.uploadedAt)}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={() => showPreview()}>
            <Eye className="size-4 text-[var(--muted-foreground)] hover:text-[var(--primary)] cursor-pointer" />
          </button>

          <button
            onClick={(e) => handleDownloadFile(file)}
            className="p-2 text-[var(--muted-foreground)] hover:text-emerald-400 transition-colors rounded-lg hover:bg-[var(--card)]/20 cursor-pointer"
            title="Download"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => handleDeleteFile(file)}
            className="p-2 text-[var(--muted-foreground)] hover:text-red-400 transition-colors rounded-lg hover:bg-[var(--card)]/20 cursor-pointer"
            title="Delete"
          >
            {isDeleting ? (
              <LoaderCircle className="w-4 h-4 text-[var(--accent)] animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[var(--card)] rounded-xl shadow-lg w-full max-w-3xl h-[80vh] max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-[var(--border)]">
              <h2 className="text-[var(--foreground)] font-semibold text-lg truncate">
                {file.originalFilename}
              </h2>
              <X
                className="w-6 h-6 text-[var(--secondary)] hover:text-[var(--accent)] cursor-pointer"
                onClick={() => setPreview(false)}
              />
            </div>

            <div className="flex-1 overflow-auto p-2">
              <iframe
                src={file.url}
                className="w-full h-full rounded"
                title={file.originalFilename}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

return (
  <div className="bg-[var(--card)] rounded-md shadow-xl shadow-blue-900/20 transition-all duration-300 overflow-hidden group border-l-4 border-b-2 border-[var(--card-border)]">
    {preview && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
        <div className="bg-[var(--card)] rounded-xl shadow-lg w-full max-w-5xl h-[80vh] max-h-[90vh] flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-[var(--border)]">
            <h2 className="text-[var(--foreground)] font-semibold text-lg truncate">
              {file.originalFilename}
            </h2>
            <X
              className="w-6 h-6 text-[var(--muted-foreground)] hover:text-[var(--muted-foreground)] cursor-pointer"
              onClick={() => setPreview(false)}
            />
          </div>

          <div className="flex-1 overflow-auto p-2">
            <iframe
              src={file.url}
              className="w-full h-full rounded"
              title={file.originalFilename}
            />
          </div>
        </div>
      </div>
    )}
    <div className={`h-32 flex wrap overflow-hidden items-center justify-center ${colorClass}`}>
            <img
        className="blur-xs"
        src={file.url}
        alt="fileView"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <Icon className="w-12 h-12" />
    </div>

    <div className="p-4">
      <Link>
        <p className="font-medium text-[var(--filecard-text)] truncate hover:text-[var(--muted-foreground)] transition-colors mb-2">
          {file.originalFilename}
        </p>
      </Link>

      <div className="space-y-2 mb-4 text-sm text-[var(--muted-foreground)]">
        <div className="flex items-center justify-between">
          <span>Size</span>
          <span>{formatFileSize(file.bytes)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Created</span>
          <span>{formatDate(file.uploadedAt)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <button
            onClick={(e) => handleDeleteFile(file)}
            className="p-2 text-[var(--muted-foreground)] hover:text-red-400 transition-colors rounded-lg hover:bg-[var(--card)]/20"
            title="Delete"
          >
            {isDeleting ? (
              <LoaderCircle className="w-4 h-4 text-blue-500 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4 cursor-pointer" />
            )}
          </button>

          <button onClick={() => showPreview()}>
            <Eye className="size-4 text-[var(--muted-foreground)] hover:text-[var(--primary)] cursor-pointer" />
          </button>
        </div>

        <button
          onClick={(e) => handleDownloadFile(file)}
          className="px-4 py-2 bg-[var(--downloadPrimary)] hover:bg-[var(--downloadPrimary-hover)] text-white border-1 border-black rounded-sm text-sm font-medium transition-colors flex items-center space-x-2 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </button>
      </div>
    </div>
  </div>
);
};

export default FileCard;
