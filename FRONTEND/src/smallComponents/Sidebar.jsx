import React from "react";
import {
  X,
  LogOut,
  User2Icon,
  UserRoundCheck,
  ArrowRightIcon
} from "lucide-react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import ThemeToggle from "./ThemeToggle.jsx";



import { useAppUser } from "../context/AppUserProvider.jsx";

const Sidebar = ({
  isOpen,
  onClose,
  activeSection,
  onSectionChange,
  menuItems,
}) => {

  const {appUser,loading}=useAppUser();
   if (loading) return <p>Loading ...</p>;
  if (!appUser) return <p>No user found</p>;



  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log(" User loggedout  Succesfully...");
    } catch (error) {
      console.log("Error Loggin Out User:", error);
    }
  };


  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 shadow-xl transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    lg:fixed lg:inset-y-0
    flex flex-col
    bg-[var(--color-sidebar)]
    text-[var(--color-sidebar-foreground)]
    border-r border-[var(--color-sidebar-border)]
  `}
      >
       
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-sidebar-border)]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8  rounded-lg flex items-center justify-center">
              {/* <Shield className="w-5 h-5 text-white" /> */}

              <img className="rounded-lg" src="public/favicon.ico" alt="icon" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--color-sidebar-foreground)]">
                SmartVault
              </h2>
              <p className="text-xs text-[var(--color-muted-foreground)]">
                Your Digital Vault
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg
      
      
      hover:bg-[var(--color-sidebar-accent)] text-[var(--color-sidebar-accent-foreground)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((eachitem, index) => (
            <NavLink
              key={index}
              to={eachitem.route}
              end
              className={({ isActive }) =>
                `w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 border border-[var(--color-sidebar-border)]
          ${
            isActive
              ? "bg-[var(--color-card)] text-[var(--color-card-foreground)] shadow-md"
              : "hover:bg-[var(--color-popover)] hover:text-[var(--color-foreground)] text-[var(--color-muted-foreground)]"
          }`
              }
            >
              {({ isActive }) => (
                <>
                  <eachitem.icon
                    className={`h-5 w-5 ${
                      isActive
                        ? "text-[var(--color-primary)]"
                        : "text-[var(--color-muted-foreground)]"
                    }`}
                  />
                  <span className="font-medium">{eachitem.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <nav className="p-4 space-y-2">
         
            <NavLink
          
              to={"/profile"}
              end
              className={({ isActive }) =>
                `w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 border border-[var(--color-sidebar-border)]
          ${
            isActive
              ? "bg-[var(--color-card)] text-[var(--color-card-foreground)] shadow-md"
              : "hover:bg-[var(--color-popover)] hover:text-[var(--color-foreground)] text-[var(--color-muted-foreground)]"
          }`
              }
            >
              {({ isActive }) => (
                <>
                <div className="flex gap-25 ">  

                  <div className="flex gap-2">
                    <User2Icon
                    className={`h-5 w-5 ${
                      isActive
                        ? "text-[var(--color-primary)]"
                        : "text-[var(--color-muted-foreground)]"
                    }`}
                  />
                  <span className="font-medium">Profile</span>
                  </div>


                  <div> 
                    <ArrowRightIcon className="w-4 h-5 text-[var(--color-muted-foreground)]"/>
                    </div>

                  </div>

                  
                </>
              )}
              
            </NavLink>
          
        </nav>

    
        <div
          className="w-55  ml-5  flex items-center justify-center  rounded-lg 
  transition-all duration-200 border border-[var(--color-sidebar-border)]"
        >
          <ThemeToggle />

          
        </div>
        

        {/* User Section */}
        <div className="left-0 right-0 p-4 border-t border-[var(--color-sidebar-border)] mt-auto">
          <div className="flex items-center space-x-3 mb-1">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-sidebar-accent)]">
              {appUser?.photo ? (
                <img
                  src={appUser.photo}
                  alt="Profile"
                   referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <UserRoundCheck className="w-5 h-5 text-[var(--color-sidebar-accent-foreground)]" />
              )}

             
            </div>
           

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{appUser.username}</p>
              <p className="text-xs truncate text-[var(--color-muted-foreground)]">
                {appUser.email}
              </p>
            </div>
          </div>
          <div className="mt-2">
            <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg bg-[var(--color-sidebar-accent)] text-[var(--color-sidebar-accent-foreground)] hover:opacity-80 transition"
          >
            <LogOut className="w-4 h-4 text-[var(--color-muted-foreground)]" />
            <span>Sign Out</span>
          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
