import React, { useState } from 'react';

const ControllerInfo = ({ description, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          X
        </button>
        <ul className="list-disc list-inside text-center">
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ControllerInfo;