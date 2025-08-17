


import React from 'react';
import { Menu } from 'lucide-react';

const Header = ({ onMenuClick, sectionName = "" }) => {
  return (
    <header className="bg-gray-950 border-b border-gray-800 lg:hidden shadow-md ">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        
   
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-all shadow-sm"
          >
            <Menu className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        <div>
          <h1 className="text-lg font-semibold text-gray-100 tracking-wide">
            {sectionName}
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
