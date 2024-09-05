import React from 'react';

interface ProfileMainMoleculeProps {
  linkImage: string;
  textName: string;
  textOccupation: string;
  textLocation: string;
  textPhone: string;
  isOpen: boolean;
}

const ProfileMainMolecule: React.FC<ProfileMainMoleculeProps> = ({
  linkImage,
  textName,
  textOccupation,
  textLocation,
  textPhone,
  isOpen,
}) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <img
        src={linkImage}
        alt="User Avatar"
        className="rounded-full w-0.5 h-0.5 mb-1"
      />
      <span className="text-3xl font-semibold text-center">{textName}</span>
      {isOpen && (
        <>
        <span className="text-sm text-gray-600">{textOccupation}</span>
        <span className="text-sm text-gray-600">{textLocation}</span>
        <span className="text-sm text-gray-600">{textPhone}</span>
        <button className="w-full text-sm text-black bg-blue-500 hover:bg-blue-900 py-2 rounded-md" onClick={(e)=>{
          e.preventDefault();
          window.location.href="https://github.com/cristianManco"
        }
        }>
          View Profile
        </button></>
      )}
    </div>
  );
};

export default ProfileMainMolecule;
