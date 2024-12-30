import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null; // Si no está abierto, no renderiza nada
  }

  return (
    <div className="fixed inset-0 bg-gray-950 bg-opacity-80 flex justify-center items-center">
      <div className="bg-white p-6 rounded-3xl shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-black">{title}</h2>
          <button onClick={onClose} className="text-gray-100 hover:text-gray-500 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;