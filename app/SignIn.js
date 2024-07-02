// SignIn.js
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
        className="border-2 border-black p-2 rounded-lg"
        onClick={signInWithGoogle}>Sign In</button>
    </div>
  );
};

export default SignIn;
