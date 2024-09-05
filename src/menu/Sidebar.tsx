import React, { useState } from 'react';
import SidebarProfileOrganism from './main/Sidebar/SidebarProfileOrganism';
import SidebarListOrganism from './main/Sidebar/SidebarListOrganism';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`transition-all duration-300 h-auto bg-blue-400 flex flex-col ${
        isOpen ? 'w-32' : 'w-64'
      }`}
    >
      <div className="flex justify-end p-2">
        <button onClick={toggleSidebar} className="text-4xl focus:outline-none">
          {isOpen ? '❮' : '❯'}
        </button>
      </div>
      <SidebarProfileOrganism isOpen={isOpen} />
      <SidebarListOrganism isOpen={isOpen} />
     
    </nav>
  );
};

export default Sidebar;
