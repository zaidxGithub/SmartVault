

import React, { useRef, useState } from 'react';
import { Upload as UploadIcon, File, X, CheckCircle, EyeIcon } from 'lucide-react';
import Sidebar from '../../../smallComponents/Sidebar.jsx';
import Header from '../../../smallComponents/Header.jsx';

import { HomeIcon, ArrowBigLeft } from 'lucide-react';
import {toast,ToastContainer} from "react-toastify"

import {auth} from"../../../firebase.js"
import { getEachFileDetailsAPI } from '../../../services/fileapi.js';
const getToken=async()=>{
    if(auth.currentUser){ return auth.currentUser.getIdToken();}
    return null;


}

const UploadFile = () => {

const BASE_URL=import.meta.env.VITE_API_BASE_URL;

const [sidebarOpen, setSidebarOpen] = useState(false);
const [file,setFile]=useState(null)
const[fileDetails,setFileDetails]=useState(null);
const[status,setStatus]=useState("");
const [dragActive, setDragActive] = useState(false);
const [uploading,setUploading]=useState(false)
const[preview ,setPreview]=useState(true);
const [showDropArea, setShowDropArea] = useState(true);
const[stats,setStats]=useState([])
 
  const menuItems = [
    { label: "Home", route: "/", icon: HomeIcon },
    { label: "Back", route: "..", icon: ArrowBigLeft },
  ];

  const handleFileChange = async(e) => {
  const selectedFile=e.target.files[0];


    try {
    const response = await getEachFileDetailsAPI();
          if (!response.success) {
            console.log(response.message);
            toast.error("Cant Fetch Details");
          }
    
        
        
      const totalCurrentSize= response.data.formattedStats.totalBytes;
      const MaxSpaceAllowed=200; //200 mbs are allowed yet now to the users
      if( (totalCurrentSize/(1024*1024))> MaxSpaceAllowed){
        toast.error("Max Space Limit Reached!");
        return 
  
      }
    } catch (error) {
      console.log("error in the uplaodfile",error);
    };
 
    if(selectedFile){
    const fileSize=selectedFile.size/(1024*1024);
      if( fileSize>=10 ) 
      {
        toast.error("File Should Be Less Than 10 Mb!")
        return;
      }
      setPreview(true);
      setFile(selectedFile);
      setFileDetails({
        name:selectedFile.name,
        size:selectedFile.size,
        type:selectedFile.type,
        preview:URL.createObjectURL(selectedFile)
      })
      setShowDropArea(false)
    }
  };

 const handleDragEnter = (e) => {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(true);
};

const handleDragLeave = (e) => {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);
};

const handleDragOver = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const handleDrop = (e) => {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);
  setShowDropArea(false)

  if (e.dataTransfer && e.dataTransfer.files.length > 0) {
    const droppedFile = e.dataTransfer.files[0]; 
    
    setFile(droppedFile);
    setFileDetails({
       name:droppedFile.name,
        size:droppedFile.size,
        type:droppedFile.type,
        preview:URL.createObjectURL(droppedFile)

    })
    e.dataTransfer.clearData(); 
  }
};

const removeFile = () => {
  if(fileDetails) URL.revokeObjectURL(fileDetails.preview)
   
  setFile(null);
 
      setFileDetails(null);
      setShowDropArea(true);
      
  if(fileInputRef.current){
    fileInputRef.current.value=null;
  }
};


const fileInputRef=useRef(null);

  const uploadFiles = async (e) => {
    setUploading(true);
    e.preventDefault();
    if(!file) return ;
    const form=new FormData();
    form.append('file',file);
    form.append('fileName',fileDetails.name);
    

    const API_URL = `${BASE_URL}/api/file`;
    const token=await getToken();
    try {
      const response=await fetch(API_URL,{
        method:"POST",
        headers: {
        Authorization: `Bearer ${token}`,
       
      },
       body:form,
      
  });
  
  
  if(!response.ok) throw new Error("Failed to Upload the File!");
  setStatus("Upload Successfully")
  toast.success("File Uploaded Successfully!")
  const data=await response.json();
  console.log("file data",data);
  
    } catch (error) {
      console.log("Upload error:",error)
      toast.error("upload Failed")
      
    }
    finally{
      setUploading(false);
      setFile(null);
      setFileDetails(null)
      setShowDropArea(true);

    }
  };

  const formatSize = (bytes) => {
    const kb = 1024;
    const mb = kb * 1024;
    if (bytes < kb) return `${bytes} B`;
    if (bytes < mb) return `${(bytes / kb).toFixed(1)} KB`;
    return `${(bytes / mb).toFixed(1)} MB`;
  };

return (
  <div className="min-h-screen bg-[var(--background)] text-[var(--muted-foreground)] transition-colors duration-300">

    <Sidebar
      isOpen={sidebarOpen}
      onClose={() => setSidebarOpen(false)}
      menuItems={menuItems}
    />

    {/* Main Content */}
    <div className="lg:pl-64">

      <Header onMenuClick={() => setSidebarOpen(true)} />
      <ToastContainer
                      position="top-center"
                      hideProgressBar={true}
                      newestOnTop={true}
                     
                      closeOnClick={true}
                      pauseOnFocusLoss
                      draggable
                    
                     theme={document.documentElement.classList.contains("dark") ? "dark" : "light"} 
                     
          
                    />

      <main className="px-4 py-2 lg:p-5 space-y-6">

        {/* Page Intro */}
        <div className="bg-[var(--card)] rounded-xl p-6 shadow-md shadow-blue-400/70 border-1 border-[var(--border)] transition-colors duration-300">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">Upload Files</h1>
          <p className="text-[var(--muted-foreground)] mt-1">Add new documents, images, and files to your collection</p>
        </div>

        {/* Drag & Drop Area of my files*/}
        {showDropArea && (
          <div
            className={`border-2 border-dashed  border-[var(--recent-border)] rounded-xl p-8 text-center transition min-h-[300px] mt-6
              ${dragActive ? 'border-[var(--accent)] bg-[var(--accent)]/20' : 'border-[var(--border)] bg-[var(--background)]/50'}
            `}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center space-y-4">
              <UploadIcon className="w-10 h-10 text-[var(--)]" />
              <p className="font-medium text-[var(--foreground)]">Drag & drop files here</p>
              <p className="text-sm text-[var(--muted-foreground)]">or click below to select</p>

              <label className="px-4 py-2 bg-[var(--downloadPrimary)] text-[var(--card-foreground)] rounded-lg cursor-pointer hover:bg-[var(--downloadPrimary-hover)] transition">
                Choose Files
                <input
                  type="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        )}

        {/* Filessssssssssss */}
        {file && (
          <div className="bg-[var(--card)]/70 mt-6 p-4 rounded-xl shadow border border-[var(--border)] transition-colors duration-300">

         
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={uploadFiles}
                disabled={uploading}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition ${
                  uploading
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {uploading ? 'Uploading...' : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Upload File
                  </>
                )}
              </button>
            </div>

        
            {file && (
              <div className="flex items-center justify-between p-2 bg-[var(--card)] rounded mb-2 border border-[var(--border)] transition-colors duration-300">
                <div className="flex items-center gap-3">
                  {file.type.startsWith("image/") && (
                    <img
                      src={fileDetails.preview}
                      alt={fileDetails.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  {file.type === "application/pdf" && preview && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                      <div className="bg-[var(--card)] rounded-xl shadow-lg w-full max-w-3xl h-[80vh] max-h-[90vh] flex flex-col transition-colors duration-300">
                      
                        <div className="flex justify-between items-center p-4 border-b border-[var(--border)]">
                          <h2 className="text-[var(--foreground)] font-semibold text-lg truncate">{fileDetails.name}</h2>
                          <X
                            className="w-6 h-6 text-[var(--muted)] hover:text-[var(--foreground)] cursor-pointer"
                            onClick={() => setPreview(false)}
                          />
                        </div>
                        {/* PDF iframe */}
                        <div className="flex-1 overflow-auto p-2">
                          <iframe
                            src={fileDetails.preview}
                            className="w-full h-full rounded"
                            title={fileDetails.name}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">{fileDetails.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {formatSize(fileDetails.size)} • {fileDetails.type || "Unknown"}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-4">
                  <button onClick={() => setPreview(true)}>
                    <EyeIcon className="w-5 h-5 text-[var(--foreground)] hover:text-[var(--muted-foreground)] cursor-pointer" />
                  </button>
                  <button
                    onClick={removeFile}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Upload Tips */}
        <div className="bg-[var(--card)] rounded-2xl p-6 shadow-md shadow-gray-800 border-l-4 border-[var(--security-border)] mt-6 transition-colors duration-300">
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Upload Tips</h3>
          <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
            <li>• Files are automatically organized by type and date</li>
            <li>• All files are scanned for security before storage</li>
            <li>• Your files are backed up and accessible from any device</li>
          </ul>
        </div>

      </main>
    </div>
  </div>
);



};

export default UploadFile;
