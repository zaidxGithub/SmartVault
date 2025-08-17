

import React from "react";
import { X, Shield } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({
  isOpen,
  onClose,
  activeSection,
  onSectionChange,
  menuItems,
}) => {
  const navigate = useNavigate();

  return (
    <>
    
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

     
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-gray-950 border-r border-gray-800 
          shadow-xl transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          lg:fixed lg:inset-y-0
        `}
      >
        
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center shadow-inner">
              <Shield className="w-5 h-5 text-gray-200" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-100">SmartVault</h2>
              <p className="text-xs text-gray-400">Your Digital Vault</p>
            </div>
          </div>

          
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
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
                `w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 
                ${
                  isActive
                    ? "bg-gray-800 text-white shadow-md"
                    : "text-gray-300 hover:bg-gray-900 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <eachitem.icon
                    className={`h-5 w-5 ${
                      isActive ? "text-white" : "text-gray-400"
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
