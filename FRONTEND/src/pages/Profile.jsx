import React, { useState } from "react";
import Sidebar from "../smallComponents/Sidebar.jsx";
import Header from "../smallComponents/Header.jsx";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import DeletePass from "../smallComponents/DeletePass.jsx";
import { useAppUser } from "../context/AppUserProvider.jsx"
import {
  HomeIcon,
  UserRoundCheck,
  LogOut,
  Trash2,
} from "lucide-react";

export const Profile = () => {
  const { appUser, loading } = useAppUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDeletePassPage, setShowDeletePassPage] = useState(false);
  const menuItems = [{ label: "Home", route: "/", icon: HomeIcon }];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log(" User loggedout  Succesfully...");
    } catch (error) {
      console.log("Error Loggin Out User:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">

      <div className="sticky top-0 z-40"><Header className="fixed top-0 left-0 right-0 bg-[var(--card)] border-b border-[var(--border)] p-4 flex items-center justify-between lg:hidden z-50"
      onMenuClick={setSidebarOpen} sectionName={"Profile"} /></div>


      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          menuItems={menuItems}
          className="fixed inset-y-0 left-0 w-64 hidden lg:block"
        />
      </div>

      <DeletePass
        isOpen={showDeletePassPage}
        onClose={() => setShowDeletePassPage(false)}
      />

      <div className="flex-1 flex flex-col lg:pl-64 mt-1  lg:mt-1 transition-colors duration-300">
        <div className=" flex flex-col justify-start items-center w-full  h-screen  bg-[var(--sidebar)] py-6 px-2 ">
          <div className="flex flex-col p-4  w-full max-w-6xl  rounded-lg items-center text-center bg-[var(--user-main)] shadow-md shadow-blue-800/60">
            <div className="flex flex-col sm:flex-row sm:gap-7 justify-center items-center">
              <div className="w-19 h-19 rounded-full border-2 flex items-center justify-center ">
                {appUser?.photo ? (
                  <img
                    src={appUser.photo}
                    alt="Profile"
                    referrerPolicy="no-referrer"
                    className="w-18 h-18 rounded-full object-cover"
                  />
                ) : (
                  <UserRoundCheck className="w-9 h-9 text-[var(--color-sidebar-accent-foreground)]" />
                )}
              </div>

              <div>
                <div>
                  <p className="mt-3 font-mono text-lg  font-semibold text-[var(--primary)]">
                    {appUser?.username || "Anonymous User"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[var(--filecard-text)]">
                    {appUser?.email || "No email available"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className=" flex flex-col max-w-2xl mt-8 space-y-3 px-4  w-full ">
            <div>
              <button
                onClick={() => handleLogout()}
                className="
              flex w-full  bg-[var(--card)]  items-center justify-center gap-2
              rounded-md border  border-[var(--border)] px-4 py-2
              text-sm font-medium text-[var(--foreground)]
             
            "
              >
                <LogOut size={16} />
                Log out
              </button>
            </div>

            <div>
              <button
                onClick={() => setShowDeletePassPage(true)}
                className="
              flex w-full items-center justify-center gap-2  bg-[var(--card)] border-[var(--border)]
              rounded-md bg-red-700/40 px-4 py-2
              text-sm font-medium text-[var(--foreground)]
              hover:bg-red-700 transition
            "
              >
                <Trash2 size={16} />
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
