import React ,{ useEffect,useState } from "react";
import {
  FileText,
  Lock,
  Plus,
  Calendar,
  Clock,
  ImageDownIcon,
  FileX2Icon,
  LockIcon,
  NetworkIcon,
  NotebookTabsIcon,
  KeyRound,NotebookPen,
  User2,
  BookImageIcon,
  FileImageIcon
  
} from "lucide-react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSignInAlt,
  FaSignOutAlt,
  FaFileDownload,
  FaFilePdf
} from "react-icons/fa";


import Footer from "../smallComponents/Footer.jsx";
import { useNavigate ,NavLink, replace} from "react-router-dom";
import fetchCurrentUser from "../services/fetchUser.js";
import { getTotalNoteAPI } from "../services/notes.js";
import { getAllPassword } from "../services/password.js";
import { getEachFileDetailsAPI } from "../services/fileapi.js";
import LoadingScreen from "../smallComponents/LoadingScreen.jsx";
import { auth } from "../firebase.js";
import { useAppUser } from "../context/AppUserProvider.jsx";
import ThemeToggle from "../smallComponents/ThemeToggle.jsx";

const Dashboard = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [totalNote, setTotalNote] = useState("");
  const [totalPass, setTotalPass] = useState("");
  const [fileStats, setFileStats] = useState([]);
  const [isloading, setisLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const getToken = async () => {
    if (auth.currentUser) {
      return auth.currentUser.getIdToken();
    }
    return null;
  };

  const getFileStats = async () => {
    try {
      setisLoading(true);
      const response = await getEachFileDetailsAPI();
      if (!response.success) {
        console.log(response.message);
      }
      const data = response.data;
      const newStats = data.formattedStats;
      setFileStats(newStats);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    const loaduserNotes = async () => {
      try {
        const totalNote = await getTotalNoteAPI();
        const notecount = totalNote.total;
        setTotalNote(notecount);
      } catch (error) {
        console.log("erorr getting all the note");
      }
    };

    const laodPass = async () => {
      try {
        const totalPass = await getAllPassword();
        const passCount = totalPass.passwords.length;
        setTotalPass(passCount);
      } catch (error) {
        console.log("erorr getting all the pass");
      }
    };
    const fetchActivity = async () => {
      const API_URL = `${BASE_URL}/user/activity/recent`;
      const token = await getToken();
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setRecentActivity(data);
     
    };

    fetchActivity();
    loaduserNotes();
    laodPass();
    getFileStats();
  }, []);

  const stats = [
    {
      label: "Stored Files",
      value: fileStats.totalFiles,
      icon: FaFileDownload,
      // color: "text-blue-400 ",
      // bg: "dark:bg-blue-900/20",

      color: "text-blue-600 dark:text-blue-300",
      bg: "bg-blue-100/70 dark:bg-blue-900/30",
    },
    {
      label: "Saved Passwords",
      value: totalPass,
      icon: Lock,

      color: "text-blue-600 dark:text-blue-300",
      bg: "bg-blue-100/70 dark:bg-blue-900/30",
    },
    {
      label: "Secure Notes",
      value: totalNote,
      icon:BookImageIcon,

      color: "text-blue-600 dark:text-blue-300",
      bg: "bg-blue-100/70 dark:bg-blue-900/30",
     
    },

    // {
    //   label: "Saved Images",
    //   value: fileStats.totalImages,
    //   icon: ImageDownIcon,
    //   color: "text-pink-400",
    //   bg: "bg-pink-900/20",
    // },
    // {
    //   label: "Stored PDFs",
    //   value: fileStats.totalPDFs || 0,
    //   icon: FaFilePdf,
    //   color: "text-blue-400",
    //   bg: "bg-blue-900/20",
    // },
    // {
    //   label: "Videos",
    //   value: fileStats.totalVideos,
    //   icon: Video,
    //   color: "text-red-400 ",
    //   bg: "bg-blue-900/20",
    // },

    // {
    //   label: "XLSX",
    //   value: fileStats.totalXlsx,
    //   icon: FileMinus,
    //   color: "text-green-400 ",
    //   bg: "bg-blue-900/20",
    // },
    // {
    //   label: "Docx",
    //   value: fileStats.totalDocx,
    //   icon: FileText,
    //   color: "text-blue-400 ",
    //   bg: "bg-blue-900/20",
    // },
    // {
    //   label: "TXT",
    //   value: fileStats.totalTxt,
    //   icon: FileMinus,
    //   color: "text-purple-400 ",
    //   bg: "bg-blue-900/20",
    // },
  ];

  
    const quickdata = [
    { label: "File Manager ", route: "/filemanager", icon: FileImageIcon },
    { label: "Password Manager", route: "/passwordmanager", icon: LockIcon },
    { label: "Notes Manager", route: "/noteshome", icon: NotebookTabsIcon },
  ];

    const {appUser,loading}=useAppUser();
    

  const actionIcons = {
    FILE_UPLOADED: FaPlus,
    FILE_DELETED: FaTrash,
    NOTE_ADDED: FaPlus,
    NOTE_DELETED: FaTrash,
    NOTE_UPDATED: FaEdit,
    PASSWORD_ADDED: FaPlus,
    PASSWORD_DELETED: FaTrash,
    LOGIN: FaSignInAlt,
    LOGOUT: FaSignOutAlt,
  };

  const handleShowList = () => {
    if (showList == false) {
      setShowList(true);
    } else {
      setShowList(false);
    }
  };

  return (
    <>
      <div
        className="w-full max-w-full flex flex-col space-y-6 p-1 sm:p-2 md:p-8 lg:p-3 overflow-x-hidden 
                      bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300"
       > 

      
        <div className=" bg-[var(--user-main)] rounded-xl p-6 mt-1 sm:mt-5 sm:p-8   shadow-md shadow-gray-700 transition-colors duration-300">
          <div className="flex items-start sm:items-center justify-between gap-4">
            <div>
              <p className=" font-mono text-xl sm:text-3xl  mb-2 text-[var(--user-text-primary)]">
                Welcome {appUser?.username}
              </p>
              <p className="text-[var(--user-text-secondary)]  text-sm sm:text-lg">
                Your digital vault is secure and ready.
              </p>
            </div>

            <div>
              <div className="flex justify-center items-center w-14 h-14 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-opacity-10 rounded-full  overflow-hidden bg-[var(--user-main)] shadow-md shadow-blue-900">
               { appUser?.photo? (<img src={appUser.photo}
                referrerPolicy="no-referrer"
                 alt="profile" 
                 className="w-14 h-14 sm:w-16 h-16 "/>):
                 (<User2 className=" size-7 sm:size-9 text-[var(--user-text-primary)]" />)}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-2 p-1 sm:p-5 lg:p-7">
          {quickdata.map((eachdata, index) => {
            const Icon = eachdata.icon;
            return (
              <div
                key={index}
                onClick={() => navigate(eachdata.route ) }
                className=" flex  gap-2 sm:gap-0 sm:flex-col bg-[var(--card)] hover:bg-[var(--popover)] p-5 sm:p-6 rounded-md shadow-md border-b-2 border-l-4   border-[var(--card-border)] 
                           cursor-pointer transition-colors duration-300 w-full hover:shadow-[0_0_10px_var(--accent)]"
              >
               <div className=" flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10  rounded-md bg-[var(--quickIcons)] "> <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--main-icons)] " /></div>
                <br />
                <h3 className="text-[var(--primary)] font-inter font-stretch-125% font-medium">
                  {eachdata.label}
                </h3>
              </div>
            );
          })}
        </div> 


{/* actoin buttons */}
<div className="flex flex-row px-2  font-mono sm:px-6 items-center  justify-between  sm:justify-around ">
      
      {/* Upload File */}
     <div className="flex w-[33%]  items-center justify-center"> 
        <button 
        onClick={()=>navigate("/filemanager/uploadfile")} 
        className="ai-glow-btn-2  w-full flex items-center justify-center  sm:gap-2
          px-3 sm:px-5 py-2 sm:py-3 text-[var(--white)] font-medium text-xs sm:text-base
          hover:cursor-pointer transition-all duration-300">
          <Plus size={18} className="group-hover:rotate-90 transition" />
          Upload File
        </button>
      </div>

      {/* Create Password */}
     <div className="flex w-[33%]  justify-center">
       
        <button onClick={()=>navigate("/passwordmanager/create-password",)}
        className="ai-glow-btn-2 w-full  flex items-center justify-center  sm:gap-2
          px-3 sm:px-5 py-2 sm:py-3 text-[var(--white)] font-medium text-xs sm:text-base
          hover:cursor-pointer transition-all duration-300">
          <KeyRound size={18} />
          Create Pass
        </button>
      </div>

      {/* Create Note */}
    <div className="flex w-[33%]  justify-center"> 
        <button 
        onClick ={()=>navigate("/noteshome/createnote")} 
        className="ai-glow-btn-2 w-full flex items-center justify-center  sm:gap-2 px-3
          sm:px-5 py-2 sm:py-3 text-[var(--white)] font-medium text-xs sm:text-base
          hover:cursor-pointer transition-all duration-300 ">
          <NotebookPen size={18} />
          Create Note
        </button>
        </div>

    </div>
{/* quickActon */}
       

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2 sm:p-4 lg:p-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-[var(--card)] p-5 sm:p-6 rounded-xl shadow-md  border-l-2 border-r-2 border-[var(--card-border)] w-full
                           hover:shadow-[0_0_10px_var(--accent)] transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[var(--muted-foreground)] mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.bg} p-3 rounded-lg`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}

          <LoadingScreen loading={isloading} />
        </div>

        {/* Recent Activity */}
        <div
          className="bg-[var(--recent-bg)] rounded-xl  border-b-2 border-l-0  border-[var(--recent-border)]  
       shadow-sm shadow-gray-500 w-full transition-all duration-300"
        >
          <div className=" p-3 sm:p-5 sm:p-6 bg-[var(--recent-top-bg)] border-t-1 border-b rounded-xl border-[var(--recent-border)] flex items-center justify-between transition-all duration-300">
            <p className="text-lg sm:text-xl font-semibold text-[var(--recent-primary)]">
              Recent Activity
            </p>
            <button
              onClick={handleShowList}
              className=" bg-[var(--viewBg)] rounded-md py-1 px-2 text-[var(--recent-secondary)] hover:text-[var(--primary)] text-sm font-medium transition-colors duration-300"
            >
              {showList ? "Show Less" : "View All"}
            </button>
          </div>

          <div
            className={`p-1 sm:p-6 space-y-1 sm:space-y-6 transition-all duration-500 ease-in-out 
                          ${
                            showList
                              ? "max-h-[700px] overflow-auto"
                              : "max-h-[220px] overflow-hidden"
                          }`}
          >
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => {
                const Icon = actionIcons[activity.action] || FaPlus;
                return (
                  <div
                    key={activity._id}
                    className="flex items-center space-x-4 sm:space-x-4 p-3 hover:bg-[var(--chart-2)] rounded-lg transition-colors duration-300"
                  >
                    <div className=" w-8 h-8 sm:w-10 sm:h-10 bg-[var(--recent-deleteIcon-bg)] border border-[var(--border)] rounded-full flex items-center justify-center">
                      <Icon className=" w-3 h-3 sm:w-4 sm:h-4 text-[var(--recent-delete-Icon)] " />
                    </div>
                    <div className="flex-1 ">
                      <p className="text-xs sm:text-sm  font-medium text-[var(--sidebar-ring)]">
                        <span className="text-[var(--foreground)] ">
                          {activity.details.fileName || ""} 
                        </span>

                        <span className="text-[var(--foreground)] ">
                          {activity.details.passtitle || ""}
                        </span>
                        <span className="text-[var(--foreground)]  ">
                          {activity.details.noteTitle || ""}
                        </span>

                        {activity.action}{" "}
                        <span className=" text-[var(--sidebar-ring)]">
                          {activity.section} <span>{activity.title}</span>
                        </span>
                      </p>
                      <div className="flex items-center space-x-1 text-xs text-[var(--muted-foreground)] mt-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {new Date(activity.createdAt).toLocaleString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-5 text-[var(--muted-foreground)]   rounded-md shadow-xs shadow-gray-800">
                <Clock className="w-6 h-6 mb-2 text-[var(--muted)]" />
                <p className="text-sm">No recent activity today</p>
              </div>
            )}
          </div>
        </div>

        {/* Security Tip */}
        <div className="bg-[var(--card)] rounded-md p-5 sm:p-6 border-l-4 border-b-2  border-[var(--security-border)] w-full transition-colors duration-300  shadow-sm shadow-gray-700">
          <div className="flex flex-col items-start space-x-4">


            <div className="flex gap-2 justify-center items-center"> 
              
            <div className="w-8 h-8 sm:h-10 sm:w-10 bg-[var(--background)] border border-[var(--border)] rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className=" h-4 w-4 sm:w-5 s:h-5 text-[var(--muted-foreground)]" />
              
            </div>
            <div> <h3 className="font-semibold text-[var(--foreground)] mb-2">
                Security Tip
              </h3></div>


            </div>




           



            <div>

              
 <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                Remember to regularly update your passwords and enable
                two-factor authentication for enhanced security. Your vault is
                only as strong as your weakest password.
              </p>

            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
