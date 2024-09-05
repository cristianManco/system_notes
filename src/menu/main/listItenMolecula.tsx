import Link from 'next/link';
import React from 'react';

interface ListItemsMoleculeProps {
  hrefUrl: string;
  text: string;
  IconComponent: React.ComponentType; 
  isOpen: boolean;
}

const ListItemsMolecule: React.FC<ListItemsMoleculeProps> = ({ hrefUrl, text, IconComponent, isOpen }) => {
  return (
    <div className="">
        <Link href={hrefUrl} className="flex items-center gap-4 text-black hover:text-blue-500 transition-transform duration-200 p-4">
        {/* Renderizamos el ícono con el tamaño adecuado */}
        <IconComponent size={isOpen ? 40 : 50} />  
        <span className="text-start font-medium">{text}</span>
        {isOpen && <>😎</>}
        </Link>
    </div>
  );
};

export default ListItemsMolecule;
