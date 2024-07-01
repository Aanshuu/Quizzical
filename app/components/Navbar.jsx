'use client';
import React, { useState } from 'react';
import { CgProfile } from "react-icons/cg";
import Link from 'next/link';

const Navbar = () => {

  return (
    <div className="text-black flex flex-col">
      <div className="container flex justify-between items-center">
        <Link href="/">
          <span className="text-3xl font-bold text-blue-500 sm:ml-40 text-nowrap">Quizzical</span>
        </Link>
        
        {/* Navigation links for desktop */}
        <div className='hidden md:flex'>
          <ul className="flex p-2 sm:mr-40">
            <button><a href="#about" className="text-blue-500 hover:text-black px-3 py-2 text-4xl">{<CgProfile />}</a></button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
