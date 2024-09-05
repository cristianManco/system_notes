import React from 'react';
import { FiEdit, FiList, FiCheckCircle } from 'react-icons/fi';
import ListItemsMolecule from '../listItenMolecula';

interface SidebarListOrganismProps {
  isOpen: boolean;
}

const listItems = [
  {
    text: 'Create new note',
    icon: FiEdit,  // Pasamos el componente del ícono en sí
    href: '/notes/create',
  },
  {
    text: 'List of notes',
    icon: FiList,
    href: '/notes/show',
  },
  {
    text: 'Notes made',
    icon: FiCheckCircle,
    href: '/notes/finished',
  },
];

const SidebarListOrganism: React.FC<SidebarListOrganismProps> = ({ isOpen }) => {
  return (
    <div className="flex flex-col py-6 px-2 gap-4">
      {listItems.map((item, index) => (
        <ListItemsMolecule
          text={item.text}
          IconComponent={item.icon} 
          hrefUrl={item.href}
          key={index}
          isOpen={isOpen}
        />
      ))}
    </div>
  );
};

export default SidebarListOrganism;
