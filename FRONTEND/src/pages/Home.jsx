
import { useState } from 'react';
import Sidebar from '../smallComponents/Sidebar.jsx';
import Dashboard from './Dashboard.jsx';
import { HomeIcon, NotebookIcon, FileArchiveIcon,LockIcon, UploadCloud, PlusCircleIcon, FileImage, FileUpIcon, FileImageIcon } from 'lucide-react';
import Footer from '../smallComponents/Footer.jsx';
import Header from '../smallComponents/Header.jsx';
import ThemeToggle from '../smallComponents/ThemeToggle.jsx';

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const menuItems = [
    { label: "Home", route: "/", icon: HomeIcon },
    { label: "File Manager", route: "/filemanager", icon: FileImageIcon },
    { label: "Password Manager", route: "/passwordManager", icon:LockIcon },
      { label: "Notes Manager", route: "/noteshome", icon: NotebookIcon },  ];

  return (
     <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      
      {/* Mobile Header */}
  
      <div className="sticky top-0 z-40"> 
         <Header   className="fixed top-0 left-0 right-0 bg-[var(--card)] border-b border-[var(--border)] p-4 flex items-center justify-between lg:hidden z-50"
        onMenuClick={setSidebarOpen}
        sectionName={"SmartVault"}/> </div>

      {/* Sidebar */}
      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          menuItems={menuItems}
          className="fixed inset-y-0 left-0 w-64 hidden lg:block"
        />
      </div>
     

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:pl-64 mt-1 sm:mt-1  lg:mt-1 transition-colors duration-300">
        <main className="flex-1 overflow-auto">
          <Dashboard />
        </main>
         <Footer />
      </div>     
    </div>
  );
};

export default Home;
