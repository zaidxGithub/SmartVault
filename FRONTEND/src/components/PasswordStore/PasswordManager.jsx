import React, { useState, useEffect } from "react";
import Sidebar from "../../smallComponents/Sidebar.jsx";
import Header from "../../smallComponents/Header.jsx"
import GeneratePassword from "./components/GeneratePassword.jsx";
import {
  getAllPassword,
  createpasswordAPI,
  deletePasswordAPI,
  getPassStatsAPI,
} from "../../services/password.js";
import { toast } from "react-toastify";
import { HomeIcon, VaultIcon, Plus, Lock,LoaderCircle, LockIcon } from "lucide-react";
import IntroSection from "../../components/PasswordStore/components/introSection.jsx";
import StatsDashboard from "../../components/PasswordStore/components/StatsDashboard.jsx";
import PasswordCard from "../../components/PasswordStore/components/PasswordCard.jsx";
import { filterPasswords, sortPasswords } from "../../components/PasswordStore/utils/passwordUtils.js";
import { useMemo } from "react";
import SearchAndSort from "../../components/PasswordStore/components/SearchAndSort.jsx";
import LoadingScreen from"../../smallComponents/LoadingScreen.jsx"
import { replace, useNavigate } from "react-router-dom";


const PasswordManager = () => {
  const [passwords, setPasswords] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [passStats, setPassStats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("created_newest");
  const[deleteLoading,setDeleteLoading]=useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate=useNavigate();

  const menuItems = [
    { label: "Home", route: "/", icon: HomeIcon },
    { label: "Password Manager", route: "/passwordmanager", icon: LockIcon },
  ];
  const filteredAndSortedPasswords = useMemo(() => {
    const filtered = filterPasswords(passwords, searchQuery);
    return sortPasswords(filtered, sortBy);
  }, [passwords, searchQuery, sortBy]);

  //Custom handle create
const handleCopyPassword = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Password copied to clipboard!");
  };

    const handleDeletePassword = async (id) => {
      try {
        setDeleteLoading(true)
       const res= await deletePasswordAPI(id);
       setRefreshKey((prev)=>prev+1);
        setPasswords((prev) => prev.filter((p) => p._id !== id));
        
        toast.success("Password deleted successfully");
  
      } catch (error) {
        console.error("Error deleting password:", error);
        toast.error("Failed to delete password");
      }finally{
        setDeleteLoading(false);
      }
    };
  
 
  
    const handleSharePassword = (password) => {
      const shareData = {
        title: password.title,
        text: `Username: ${password.username}\nPassword: ${password.password}`,
      };
  
      if (navigator.share) {
        navigator.share(shareData).catch(() => {
          alert("Sharing failed or was cancelled");
        });
      } else {
        alert("Sharing is not supported on this device");
      }
    };
  

 const fetchPasswords = async () => {
    try {
      const pass = await getAllPassword();
      if(pass?.passwords) return pass.passwords;
    } catch (error) {
      console.error("Error fetching passwords:", error);
    } 
  };

  const fetchPassStats = async () => {
    try {
     
      const stats = await getPassStatsAPI();
      if (!stats) {
        console.log("No stats Fetched from backed@!");
      }
      return stats;
    } catch (error) {
     console.log(error)
    }
  };



  const fetchAllData=async()=>{
    try {

      setLoading(true);
    
      const [passRes,statsRes]=await Promise.all([
        
        fetchPasswords(),
        fetchPassStats(),
      ]);
      setPasswords(passRes);
      setPassStats(statsRes);
      
    } catch (error) {
      console.log(error)
      
    }finally{
      setLoading(false);

    }
  }

  useEffect(()=>{
    fetchAllData();
  },[refreshKey])





  return (
    <div className="min-h-screen bg-[var(--background)] flex lg:pl-4 transition-colors duration-300">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        menuItems={menuItems}
      />

      <div className="flex-1 flex flex-col ml-0  lg:ml-60 sticky top-0 z-40">
        <div className="sticky top-0 z-40 bg-[var(--background)]">
          <Header
            sectionName="Password Manager"
            onMenuClick={() => setSidebarOpen(true)}
          />
        </div>
        
          <LoadingScreen 
          loading={loading}/>
        

        <div className=" sticky sticky-top z-index:40 px-4 lg:pt-6">
          <IntroSection />
        </div>

        {/* Stats Dashboard */}
        <div className=" px-2 py-2 lg:px-10 mb-1 sm:mb-2">
          <StatsDashboard stats={passStats} />
        </div>

        <div className="flex w-full justify-between  items-center  gap-2">
          <div className="flex w-[60%]  ml-2 lg:ml-9">
            <GeneratePassword />
          </div>

          {/* Add Password Button */}
          <div className="flex w-[40%] justify-end mt-1">
            <button
              onClick={() => navigate("/passwordmanager/create-password")}
              className="ai-glow-btn bg-[var(--hover)] group relative overflow-hidden rounded-md border border-[var(--border)] text-sm sm:text-sm mb-2 mr-2 lg:mr-9 flex items-center gap-1 sm:gap-2
  px-2  py-2 sm:py-3 sm:px-4 font-semibold  text-[var(--foreground)] transition-all duration-300 
      hover:bg-[var(--hover)] hover:shadow-md"
            >
              <Plus className="size-4 sm:size-5" />
              Add Password
              <span className="absolute inset-0 bg-gradient-to-r from-[#58a6ff40] to-[#8b5cf640] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </button>
          </div>
        </div>

        <div className="bg-[var(--background)]  shadow-sm  p-2 sm:p-6 mb-6 mt-2  transition-colors">
          <SearchAndSort
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {filteredAndSortedPasswords?.length === 0 ? (
            <div className="text-center py-16 bg-[var(--card)] rounded-md min-h-100">
              <div className="bg-[var(--muted)] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-10 h-10 text-[var(--muted-foreground)]" />
              </div>

              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                {passwords?.length === 0
                  ? "No passwords yet"
                  : "No passwords found"}
              </h3>
             

              {passwords?.length === 0 && (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="bg-[var(--accent)] text-[var(--foreground)] 
                           px-6 py-2.5 rounded-lg font-semibold 
                          transition-colors"
                >
                  Add Your First Password
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
              {filteredAndSortedPasswords?.map((password) => (
                <PasswordCard
                  key={password._id}
                  password={password}
                  onCopy={handleCopyPassword}
                  onDelete={handleDeletePassword}
                  onShare={handleSharePassword}
                  isDelete={deleteLoading}
                 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordManager;
