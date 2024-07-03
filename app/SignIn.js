// SignIn.js
'use client';
import React from 'react';
import { auth, provider, signInWithPopup } from './firebase';

const SignIn = ({ setUser }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button 
        className="text-4xl font-bold border-2 font-roboto border-black p-2 rounded-lg text-[#6CBF8F] hover:bg-[#000000] transition duration-300 ease-in-out shadow-sm shadow-black"
        onClick={signInWithGoogle}>
        Sign In
      </button>
    </div>

  );
};

export default SignIn;
// bg-gradient-to-r from-[#240750] via-[#000000] to-[#2c3e50]