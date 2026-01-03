

import React, { useState } from "react";
import Sidebar from "../../../smallComponents/Sidebar.jsx";
import Header from "../../../smallComponents/Header.jsx";
import Dashboard from "./Dashboard.jsx";
import { FileProvider } from "../context/filecontext.jsx";
import { ArrowBigLeft, HomeIcon, UploadIcon } from "lucide-react";
const HomeFileManager = () => {
    const sectionName = "File Manager";
    const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { label: "Home", route: "/", icon: HomeIcon },
    { label: "Upload", route: "uploadfile", icon: UploadIcon },
    { label: "Back", route: ".", icon: ArrowBigLeft },
  ];



  return (
  <FileProvider>
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] lg:mt-0">
      <div className="sticky top-0 z-40">
        <Header
          className="fixed top-0 left-0 right-0 bg-[var(--card)] border-b border-[var(--border)] p-4 flex items-center justify-between lg:hidden z-50"
          onMenuClick={() => setSidebarOpen(true)}
          sectionName={sectionName}
        />
      </div>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        menuItems={menuItems}
        className="fixed inset-y-0 left-0 w-64 hidden lg:block"
      />

      {/* Main Content */}
      <div className="lg:pl-64 mt-0 sm:mt-0 py-0">
        <main className="sm:p-0 ">
          <div className="bg-[var(--background)] rounded-lg px-3 sm:px-6 shadow-xl border-[var(--border)] transition-colors duration-300">
            <Dashboard />
          </div>
        </main>
      </div>

    </div>
  </FileProvider>
);


};

export default HomeFileManager;
