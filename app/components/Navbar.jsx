'use client';
import React, { useState } from 'react';
import { CgProfile } from "react-icons/cg";
import Link from 'next/link';
import Modal from './Modal'; 

const Navbar = ({averageScore, setUser}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="w-full">
      <div className="mx-auto flex items-center justify-between py-4 px-4 w-3/4">
        <div className="text-3xl font-bold text-[#4D5B9E] whitespace-nowrap">Quizzical</div>
        {/* Navigation links for desktop */}
        <div className='flex'>
          <ul className="flex space-x-4">
            <li>
                <button onClick={toggleModal} className="text-[#4D5B9E] hover:text-black text-4xl"><CgProfile /></button>
            </li>
          </ul>
        </div>
      </div>
      {isModalOpen && <Modal toggleModal={toggleModal} averageScore={averageScore} setUser={setUser}/>}
    </div>
  );
};

export default Navbar;
