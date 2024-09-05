import React from 'react';
import ProfileMainMolecule from '../ProfileMainMolecules';

interface SidebarProfileOrganismProps {
  isOpen: boolean;
}

const SidebarProfileOrganism: React.FC<SidebarProfileOrganismProps> = ({
  isOpen,
}) => {
  const userProfile = {
    name: 'Cristian Manco',
    image: '/img/OIP (1).jpeg', 
    occupation: 'FullStack Developer',
    location: 'Medellin City',
    phone: '313-525-86-60'
  };

  return (
    <div className="flex flex-col items-center p-4 border-b-2 border-b-violet-900">
      <ProfileMainMolecule
        linkImage={userProfile.image}
        textName={userProfile.name}
        textOccupation={userProfile.occupation}
        textLocation={userProfile.location}
        textPhone={userProfile.phone}
        isOpen={isOpen}
      />
    </div>
  );
};

export default SidebarProfileOrganism;
