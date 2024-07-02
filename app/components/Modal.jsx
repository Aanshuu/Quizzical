import React from 'react';
import Overlay from './Overlay';
import { signOutUser } from '../firebase';

const Modal = ({ toggleModal, averageScore , setUser}) => {
  const handleSignOut = async () => {
    await signOutUser();
    toggleModal();
    setUser(null) // Close the modal after signing out
  };

  return (
    <Overlay onClose={toggleModal}>
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Profile</h2>
        <p className="mb-4">Average Score: {averageScore.toFixed(2)}/5</p>
        <button
          onClick={handleSignOut}
          className="bg-[#4D5B9E] px-5 py-2 border-2 rounded-2xl text-white text-md"
        >
          Sign Out
        </button>
      </div>
    </Overlay>
  );
};

export default Modal;
