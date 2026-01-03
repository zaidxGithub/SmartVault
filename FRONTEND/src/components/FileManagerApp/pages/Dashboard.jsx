import React, { useState ,useEffect} from "react";
import FileCard from "../components/FileCard.jsx";
import FileStats from "../components/FileStats.jsx";
import { Grid, List, Filter, SortAsc, LoaderCircle, UploadIcon } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../../../firebase.js";
import { useLocation, useNavigate } from "react-router-dom";
import StorageBar from "../components/StorageBar.jsx";

import {
  getEachFileDetailsAPI,
  getUserFilesAPI,
} from "../../../services/fileapi.js";

const Dashboard = () => {
  const navigate=useNavigate();
  const [viewType, setViewType] = useState("grid");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [stats, setStats] = useState(null);

  const sortFiles = (files, sortBy) => {
    const sorted = [...files]; // avoid mutating the original array
    switch (sortBy) {
      case "date":
        sorted.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
        break;

      case "name":
        sorted.sort((a, b) =>
          (a.originalFilename ?? "").localeCompare(
            b.originalFilename ?? "",
            undefined,
            {
              sensitivity: "base",
            }
          )
        );
        break;

      case "size":
        // Largest first
        sorted.sort((a, b) => (b.bytes ?? 0) - (a.bytes ?? 0));
        break;

      default:
        break;
    }

    return sorted;
  };

  const filteredFiles = files.filter((file) => {
    if (filterType === "all") return true;

    const type = (file.resource_type ?? "").toLowerCase();
    const format = (file.format ?? "").toLowerCase(); // format like 'pdf', 'jpg', 'mp4'

     if (filterType === "image") {
      return type === "image" && format !== "pdf";
    }
     if (filterType === "document") {
      return (
        format === "pdf" ||
        format === "docx" ||
        format === "doc" ||
        format === "ppt"||
        format==="pptx"||
        format==="txt"
      );
    }
    
  

    if (filterType === "spreadsheet") {
      return (
         format === "csv" ||
        format === "xls" ||
        format === "xlsx" 
      );
    }

    if (filterType === "video") {
      return (
         format === "mp4" ||
        format === "mkv" ||
        format === "webm" 
      );
    }

      

    if (filterType === "audio") {
     return(
      format==="mp4"||format==="mkv"||format==="recordings"
     )
    }
    if (filterType === "other") {
     return(
      format==="zip"||format==="rar"||format==="unknown"
     )
    }

    return true;
  });

  const sortedFiles = sortFiles(filteredFiles, sortBy);

  const getEachFileDetails = async (e) => {
    try {
      setLoading(true);
      const response = await getEachFileDetailsAPI();
      if (!response.success) {
        toast.error("Cant Fetch Details");
      }

      const data = response.data;
      const newStats = data.formattedStats;

      setStats(newStats); // file stas ko lane wali api
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserFiles = async (e) => {
    const response = await getUserFilesAPI();
    if (!response.success) {
      toast.error("Error Fetching Files!!!");
    }

    const arrayOfFiles = response.arrayOfFiles;
    setFiles(arrayOfFiles);
  };

  const handleCardDeleted = () => {
    getUserFiles();
    getEachFileDetails();
    toast.success("File Deleted");
  };

  const location = useLocation();
  useEffect(() => {
    getUserFiles();
    getEachFileDetails();
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="size-20 text-gray-400 animate-spin" />
      </div>
    );
  }


return (
  <div
    className="space-y-3  pb-4 sm:space-y-8 font-sans text-[var(--foreground)] bg-[var(--background)]"
  >
       <ToastContainer
                  position="top-center"
                  hideProgressBar={false}
                  newestOnTop={true}
                  closeOnClick
                  pauseOnFocusLoss
                  draggable
                
                 theme={document.documentElement.classList.contains("dark") ? "dark" : "light"} 
                 
      
                />
   
    <div className="flex items-center justify-between bg-[var(--card)] rounded-sm py-1 px-2 border-b-3  shadow-lg shadow-blue-900/20 ">
      <div>
        <p className="text-2xl font-bold text-[var(--foreground)] hidden lg:block">
          File Manager
        </p>
        <p className="text-sm sm:text-lg lg:text-lg text-[var(--muted-foreground)]">
          Welcome back! Here's an overview of your files
        </p>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm sm:text-lg font-medium text-[var(--foreground)] mb-2">
            {files.length} Total Files
          </p>
          <StorageBar usedMB={stats.totalBytes} />
        </div>
      </div>
    </div>

<div className=" md:hidden  flex flex-col items-center ">
          
          <StorageBar usedMB={stats.totalBytes} />
         
        </div>

    <FileStats fileStats={stats} />

     <div className="grid gap-6 ">
        <div
          
          className=" mt-4 mb-3 sm:mb-1 bg-[var(--background)] shadow-md shadow-blue-800/40  rounded-xl  p-1 border-l-3 border-r-3 border-[var(--stats-card-border)]  transition-colors"
        >
         <span onClick={()=>navigate("/filemanager/uploadFile")}> 
         <div className="flex items-center justify-center gap-3 bg-[var(--accent)] rounded-lg h-14">

          <UploadIcon className="text-[var(--muted-foreground)]"/>
          
            <div className="text-sm font-medium text-[var(--muted-foreground)]">Start Uploading Files</div> 
            

          </div>
          </span>
         
        </div>
    
   
  </div>

    {/* Filter & Sort */}
    <div
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between
                 space-y-4  sm:space-y-0 bg-[var(--background)] p-4 rounded-xl shadow-md border-r-4 border-b-2 border-l-4 border-[var(--sort-border)]"
    >
      <div className="flex items-center space-x-4">
        {/* Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-[var(--muted-foreground)]" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-[var(--primary-foreground)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm 
                       focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent text-[var(--foreground)]"
          >
            <option value="all">All Files</option>
             <option value="image">Images</option>
            <option value="document">Documents</option>
            <option value="spreadsheet">Spreadsheets</option>
             <option value="video">Videos</option>
              <option value="audio">Audio</option>

            <option value="other">Others</option>
           
           
           
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center space-x-2">
          <SortAsc className="w-4 h-4 text-[var(--muted-foreground)]" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[var(--primary-foreground)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm 
                       focus:ring-2 focus:ring-[var(--muted)] focus:border-transparent text-[var(--foreground)]"
          >
            <option value="date">Date</option>
            <option value="name">Name</option>
            <option value="size">Size</option>
          </select>
        </div>
      </div>

      {/* View toggle */}
      <div
        className="flex items-center space-x-2 bg-[var(--primary-foreground)] rounded-lg p-1 border border-[var(--border)]"
      >
        <button
          onClick={() => setViewType("grid")}
          className={`p-2 rounded-lg transition-colors ${
            viewType === "grid"
              ? "bg-[var(  --popover)] text-[var(--foreground)] shadow-md"
              : "hover:bg-[var(--muted)] text-[var(--muted-foreground)]"
          }`}
        >
          <Grid className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewType("list")}
          className={`p-2 rounded-lg transition-colors ${
            viewType === "list"
              ? "bg-[var(--popover)] text-[var(--foreground)] shadow-md"
              : "hover:bg-[var(--muted)] text-[var(--muted-foreground)]"
          }`}
        >
          <List className="w-4 h-4" />
        </button>
      </div>
    </div>

    {/* No files message */}
    {files.length === 0 ? (
      <div
        className="   text-center py-12  rounded-xl  bg-[var(--card)]  shadow-md border border-[var(--border)]"
      >
        <div className=" mb-2 w-16 h-16 bg-[var(--input)] rounded-full flex items-center justify-center mx-auto ">
          <Filter className="w-8 h-8 text-[var(--muted-foreground)]" />
        </div>
        <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
          No files found
        </h3>
        <p className="text-[var(--muted-foreground)]">
          Try adjusting your filters or upload some files.
        </p>
      </div>
    ) : (
      <div
        className={
          viewType === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            : "space-y-4"
        }
      >
        {sortedFiles.map((file) => (
          <FileCard
            key={file._id}
            file={file}
            type={file.resource_type}
            viewType={viewType}
            onDeleteSuccess={handleCardDeleted}
          />
        ))}
      </div>
    )}
  </div>
);




};

export default Dashboard;
