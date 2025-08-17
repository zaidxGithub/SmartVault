


import React from 'react';
import { Menu } from 'lucide-react';

const Header = ({ onMenuClick, sectionName }) => {
  return (
    <header className="bg-[#0d1117] border-b border-[#30363d] shadow-sm">
      <div className="flex items-center justify-between h-14 sm:h-16 px-4 lg:px-8">
        

        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md hover:bg-[#21262d] transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-200">
            {sectionName}
          </h2>
        </div>

      </div>
    </header>
  );
};

export default Header;
