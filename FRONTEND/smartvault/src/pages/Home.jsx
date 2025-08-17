


// import { useState } from 'react';
// import Sidebar from './Sidebar.jsx';
// import Dashboard from './Dashboard.jsx';
// import {MenuIcon, HomeIcon,NotebookIcon,FileImageIcon,VaultIcon,ForwardIcon } from 'lucide-react';

// const Home = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);


//           const menuItems = [
//     { label: "Home", route: "/", icon: HomeIcon },
//     { label: "Notes Manager", route: "/noteshome", icon: NotebookIcon },
//     { label: "File Manager", route: "/filemanager", icon: FileImageIcon },
//     { label: "Password Manager", route: "/passwordManager", icon:VaultIcon },
//     { label: "PassWord Generator", route: "/PasswordGenerator", icon:ForwardIcon },
//   ];
       


//   return (
//     <div className="min-h-screen bg-gray-50 ">

//           <div className="fixed top-0 left-0 right-0  bg-white border-b border-gray-200 p-4 flex items-center justify-between  lg:hidden">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="p-2 rounded-lg hover:bg-gray-100 transition-colors  lg:hidden"
//           >
//             <MenuIcon className="w-6 h-6 text-gray-600" />
//           </button>


//           <h1 className="text-lg font-semibold text-gray-900">SmartVault</h1>
//         </div>

//       {/* Sidebar */}
    
    
      
//         <div className=" fixed-1 inset-0 z-50 flex">
//           <Sidebar
//     isOpen={sidebarOpen}
//     onClose={() => setSidebarOpen(false)}
//     menuItems={menuItems}
//     className="fixed inset-y-0 left-0 w-64 hidden lg:block"
//   />
//         </div>
    

//       {/* Main Content */}
//       <div className="flex-1 flex-col lg:pl-64 mt-17 sm:mt-1 ">
//         {/* Header - always takes full width of main area */}
    
//         {/* Main area */}
//         <main className="p-0 lg:p-0 flex-1">
//           <Dashboard />
//         </main>
//       </div>




//     </div>
//   );
// };

// export default Home;





import { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import Dashboard from './Dashboard.jsx';
import { MenuIcon, HomeIcon, NotebookIcon, FileImageIcon, VaultIcon, ForwardIcon } from 'lucide-react';

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { label: "Home", route: "/", icon: HomeIcon },
    { label: "Notes Manager", route: "/noteshome", icon: NotebookIcon },
    { label: "File Manager", route: "/filemanager", icon: FileImageIcon },
    { label: "Password Manager", route: "/passwordManager", icon: VaultIcon },
    { label: "PassWord Generator", route: "/PasswordGenerator", icon: ForwardIcon },
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 bg-[#161b22] border-b border-[#30363d] p-4 flex items-center justify-between lg:hidden z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-[#21262d] transition-colors lg:hidden"
        >
          <MenuIcon className="w-6 h-6 text-[#8b949e]" />
        </button>
        <h1 className="text-lg font-semibold text-[#f0f6fc]">SmartVault</h1>
      </div>

      {/* Sidebar */}
      <div className="fixed-1 inset-0 z-50 flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          menuItems={menuItems}
          className="fixed inset-y-0 left-0 w-64 hidden lg:block bg-[#161b22] border-r border-[#30363d]"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex-col lg:pl-64 mt-16 sm:mt-1 bg-[#0d1117]">
        <main className="p-4 lg:p-6 flex-1">
          <Dashboard />
        </main>
      </div>

    </div>
  );
};

export default Home;
