// // import React from "react";
// // import {
// //   X,
// //   Home,
// //   FileText,
// //   Lock,
// //   StickyNote,
// //   LogOut,
// //   Shield,
// //   Icon,
// //   HomeIcon,
// //   PhoneCall,
// //   ListTodo,
// //   Workflow,
// //   UploadCloud,
// //   SearchXIcon,
// //   ArrowBigLeft,
// //   LucideUpload,
// // } from "lucide-react";

// // import { NavLink, useNavigate } from "react-router-dom";
// // // import UploadFile from "../context/filecontext.jsx";

// // const Sidebar = ({
// //   isOpen,
// //   onClose,
// //   activeSection,
// //   onSectionChange,
// //   menuItems
// // }) => {
// //   const navigate = useNavigate();
// //   const isActive = activeSection === "";


// //   return (
// //     <>
// //       {/* Mobile Overlay */}
// //       {isOpen && (
// //         <div
// //           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
// //           onClick={onClose}
// //         />
// //       )}

// //       {/* Sidebar */}
// //       <div
// //         className={`
// //     fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
// //     ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
// //     lg:fixed lg:inset-y-0
// //   `}
// //       >
// //         {/* Header */}
// //         <div className="flex items-center justify-between p-6 border-b border-gray-200">
// //           <div className="flex items-center space-x-3">
// //             <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
// //               <Shield className="w-5 h-5 text-white" />
// //             </div>
// //             <div>
// //               <h2 className="text-lg font-bold text-gray-900">SmartVault</h2>
// //               <p className="text-xs text-gray-500">Your Digital Vault </p>
// //             </div>
// //           </div>

// //           <button
// //             onClick={onClose}
// //             className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
// //           >
// //             <X className="w-5 h-5 text-gray-500" />
// //           </button>
// //         </div>

// //         {/* Navigation */}

// //         <nav className="p-4 space-y-2 ">

// //           {menuItems.map((eachitem, index) => (
// //             <NavLink
// //               key={index}
// //               to={eachitem.route}
// //               end
// //               className={({ isActive }) =>
// //                 `w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 border shadow-sm
// //      ${
// //        isActive
// //          ? "bg-blue-50 text-blue-700"
// //          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
// //      }`
// //               }
// //             >
// //               {({ isActive }) => (
// //                 <>
// //                   <eachitem.icon
// //                     className={`h-5 w-5 ${
// //                       isActive ? "text-blue-500" : "text-gray-500"
// //                     }`}
// //                   />
// //                   <span className="font-medium">{eachitem.label}</span>
// //                 </>
// //               )}
// //             </NavLink>
// //           ))}
// //         </nav>
// //       </div>
// //     </>
// //   );
// // };

// // export default Sidebar;


















// import React from "react";
// import {
//   X,
//   Shield,
// } from "lucide-react";
// import { NavLink } from "react-router-dom";

// const Sidebar = ({
//   isOpen,
//   onClose,
//   activeSection,
//   onSectionChange,
//   menuItems,
// }) => {
//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={onClose}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`
//           fixed inset-y-0 left-0 z-50 w-64 
//           bg-gray-900 border-r border-gray-800 shadow-xl
//           transform transition-transform duration-300 ease-in-out
//           ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
//           lg:fixed lg:inset-y-0
//         `}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-800">
//           <div className="flex items-center space-x-3">
//             <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
//               <Shield className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h2 className="text-lg font-bold text-white">SmartVault</h2>
//               <p className="text-xs text-gray-400">Your Digital Vault</p>
//             </div>
//           </div>

//           <button
//             onClick={onClose}
//             className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
//           >
//             <X className="w-5 h-5 text-gray-400" />
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="p-4 space-y-2">
//           {menuItems.map((eachitem, index) => (
//             <NavLink
//               key={index}
//               to={eachitem.route}
//               end
//               className={({ isActive }) =>
//                 `w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200
//                 ${
//                   isActive
//                     ? "bg-blue-600/20 text-blue-400 border border-blue-600"
//                     : "text-gray-300 hover:bg-gray-800 hover:text-white"
//                 }`
//               }
//             >
//               {({ isActive }) => (
//                 <>
//                   <eachitem.icon
//                     className={`h-5 w-5 ${
//                       isActive ? "text-blue-400" : "text-gray-400"
//                     }`}
//                   />
//                   <span className="font-medium">{eachitem.label}</span>
//                 </>
//               )}
//             </NavLink>
//           ))}
//         </nav>
//       </div>
//     </>
//   );
// };

// export default Sidebar;










import React from "react";
import { X, Shield } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, onClose, menuItems }) => {
  return (
    <>
      
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[#0d1117] border-r border-[#30363d] 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          lg:fixed lg:inset-y-0
        `}
      >
   
        <div className="flex items-center justify-between p-6 border-b border-[#30363d]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#161b22] rounded-lg flex items-center justify-center border border-[#30363d]">
              <Shield className="w-5 h-5 text-gray-200" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-200">SmartVault</h2>
              <p className="text-xs text-gray-400">Your Digital Vault</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-[#21262d] transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((eachitem, index) => (
            <NavLink
              key={index}
              to={eachitem.route}
              end
              className={({ isActive }) =>
                `w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 
                ${
                  isActive
                    ? "bg-[#21262d] border border-[#30363d] text-white"
                    : "text-gray-400 hover:bg-[#21262d] hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <eachitem.icon
                    className={`h-5 w-5 ${
                      isActive ? "text-white" : "text-gray-500"
                    }`}
                  />
                  <span className="font-medium">{eachitem.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
