import React from 'react';

const Overlay = ({ children, onClose }) => {
    const handleClick = (e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      };
    
    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={handleClick}>
      {children}
    </div>
  );
};

export default Overlay;
