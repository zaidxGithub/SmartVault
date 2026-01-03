import React from 'react';
import { FileMinus, FileText, Image, Video, HardDrive, LoaderCircle, AudioLinesIcon ,} from 'lucide-react';
import { FaFilePdf } from 'react-icons/fa';
import StorageBar from './StorageBar';

const FileStats = (fileStats) => {
  if(!fileStats){
    return(<>
     <LoaderCircle className='size-12 animate-spin'/>
     <h3> Loading...</h3>
    <div>
    </div>
  
    </>)
  }
 
function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

  const stats = [
    {
      name: 'Total Files',
      value: fileStats.fileStats.totalFiles||0,
      icon: FileText,
      color: 'text-gray-300 bg-gray-800/60',
     
    },
     {
      name: 'Storage Used',
      value:formatBytes(fileStats.fileStats.totalBytes),
      icon: HardDrive,
      color: 'text-orange-400 bg-orange-900/40',
      
    },
    {
      name: 'Images',
      value: fileStats.fileStats.totalImages||0,
      icon: Image,
      color: 'text-green-400 bg-green-900/40',
      
    },
     {
      name: 'Documents',
      value: fileStats.fileStats.totalDocuments||0,
      icon: FileMinus,
      color: 'text-purple-400 bg-purple-900/40',
     
    },
      {
      name: 'SpreadSheets',
      value: fileStats.fileStats.totalSpreadSheets||0,
      icon: FileMinus,
      color: 'text-purple-400 bg-purple-900/40',
     
    },
    {
      name: 'Videos',
      value: fileStats.fileStats.totalVideos||0,
      icon: Video,
      color: 'text-yellow-400 bg-red-900/40',
      
    },
      {
      name: 'Audio',
      value: fileStats.fileStats.totalAudios||0,
      icon: AudioLinesIcon,
      color: 'text-green-400 bg-green-900/40',
     
    },
    {
      name: 'Others',
      value: fileStats.fileStats.totalOthers||0,
      icon: FaFilePdf,
      color: 'text-red-400 bg-red-900/40',
     
    },
  
   
  
   
   
  ];



return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {stats.map((stat) => {
      const Icon = stat.icon;
      return (
        <div
          key={stat.name}
          className="bg-[var(--card)] flex  sm:block justify-between rounded-xl shadow-md p-6 border-l-2 border-r-2  border-[var(--card-border)] transition-colors"
        >
          <div className="flex items-center justify-between">



            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
              <Icon className="w-6 h-6 text-[var(--foreground)]" />
            </div>
            {/* <span className="text-sm font-medium text-[var(--accent)]">{stat.change}</span> */}

          </div>
          <div className=" flex flex-col sm:block gap-2 justify-center items-center mt-1 sm:mt-4">
              <p className="text-sm text-[var(--muted-foreground)]">{stat.name}</p>
            <h3 className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</h3>
          
          </div>
        </div>
      );
    })}
  </div>
);


};

export default FileStats;
