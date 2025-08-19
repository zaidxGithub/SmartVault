



import React from 'react';
import { X, Shield, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.js';
const Sidebar = ({ isOpen, onClose, activeSection, onSectionChange, menuItems }) => {
  const navigate = useNavigate();


  const handleLogout=async()=>{
    try {
    await  signOut(auth);
      console.log(" User loggedout  Succesfully...");
      
    } catch (error) {
      console.log("Error Loggin Out User:",error)
      
    }

  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[#0d1117] border-r border-[#30363d] shadow-xl transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          lg:fixed lg:inset-y-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#30363d]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#f0f6fc]">SmartVault</h2>
              <p className="text-xs text-[#8b949e]">Your Digital Vault</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-[#21262d] transition-colors"
          >
            <X className="w-5 h-5 text-[#8b949e]" />
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
                `w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 border border-[#30363d]
                ${
                  isActive
                    ? "bg-[#161b22] text-[#f0f6fc] shadow-md"
                    : "text-[#c9d1d9] hover:bg-[#21262d] hover:text-[#f0f6fc]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <eachitem.icon
                    className={`h-5 w-5 ${
                      isActive ? "text-blue-500" : "text-[#8b949e]"
                    }`}
                  />
                  <span className="font-medium">{eachitem.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Section */}
        <div className="left-0 right-0 p-4 border-t border-[#30363d]">
          <div className="flex items-center space-x-3 mb-1">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#f0f6fc] truncate">
                Mohammad Zaid
              </p>
              <p className="text-xs text-[#8b949e] truncate">zaid@example.com</p>
            </div>
          </div>
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] rounded-lg transition-colors">
            <LogOut className="w-4 h-4 text-[#8b949e]" />

            <span onClick={handleLogout}>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
