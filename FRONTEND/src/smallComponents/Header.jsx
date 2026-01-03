import React from 'react'
import { Menu ,MenuIcon} from 'lucide-react'


const Header = ({ onMenuClick, sectionName = "" }) => {
  return (
    <header className="lg:hidden top-0 left-0 right-0 shadow-md border-b border-[var(--sidebar-border)] bg-[var(--sidebar)]">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className=" p-2 rouded-lg   hover:bg-[var(--popover)] text-[var(--color-sidebar-accent-foreground)] transition-colors"
          >
            <MenuIcon className="w-6 h-6 text-[var(--Muted-foreground)]" />
          </button>
        </div>

        <div>
          <p className="text-lg font-medium tracking-wide text-[var(--foreground)]">
            {sectionName}
          </p>
        </div>
      </div>
    </header>




  );
};

export default Header;



