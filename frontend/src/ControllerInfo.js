import React, { useState } from 'react';

const ControllerInfo = ({ description }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
          onClick={handleClose}
        >
          X
        </button>
        <p className="text-center">{description}</p>
      </div>
    </div>
  );
};

export default ControllerInfo;