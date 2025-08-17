

import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import Dashboard from "./Dashboard.jsx";
import { FileProvider } from "../context/filecontext.jsx";
import { ArrowBigLeft, HomeIcon, UploadIcon } from "lucide-react";
import UploadFile from "./UploadFile.jsx";

const HomeFileManager = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { label: "Home", route: "/", icon: HomeIcon },
    { label: "Upload", route: "uploadfile", icon: UploadIcon },
    { label: "Back", route: ".", icon: ArrowBigLeft },
  ];

  const sectionName = "File Manager";

  return (
    <FileProvider>
      <div className="min-h-screen bg-[#0d1117] text-gray-200 mt-15 lg:mt-0">
     
        <div className="fixed top-0 left-0 right-0 z-40">
          <Header
            sectionName={sectionName}
            onMenuClick={() => setSidebarOpen(true)}
          />
        </div>

     
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          menuItems={menuItems}
          className="fixed inset-y-0 left-0 w-64 hidden lg:block"
        />

        <div className="lg:pl-64 mt-16 sm:mt-0 py-4">
          <main className="p-4 lg:p-8">
            <div className="bg-[#161b22] rounded-2xl p-6 shadow-xl border border-[#30363d]">
              <Dashboard />
            </div>
          </main>
        </div>
      </div>
    </FileProvider>
  );
};

export default HomeFileManager;
