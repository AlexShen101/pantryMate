'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "../utils/firebase/auth";
import { useAuth } from "./context/AuthContext";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const handleSignIn = event => {
    event.preventDefault();
    signInWithGoogle();
  };

  useEffect(() => {
    // if user is logged in, redirect to pantry
    if (!loading && user) {
      router.push("/pantry");
    }
  }, [loading, user]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-sm p-8 bg-[#121212] rounded-lg shadow-md">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 mb-4">
              <img src="https://placehold.co/48x48" alt="Logo" className="w-full h-full" />
            </div>
            <h2 className="text-xl font-semibold">Login to PantryMate</h2>
            <p className="text-sm text-gray-400">Food made simple.</p>
          </div>
          <form className="space-y-4">
            <div>
              <input type="text" placeholder="Email or username" className="w-full px-4 py-2 text-sm text-gray-300 bg-[#1e1e1e] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="relative">
              <input type="password" placeholder="Password" className="w-full px-4 py-2 text-sm text-gray-300 bg-[#1e1e1e] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <button type="submit" className="w-full py-2 text-sm font-semibold text-black bg-lime-500 rounded hover:bg-lime-600">Log in</button>
          </form>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="mx-2 text-sm text-gray-400">Authorize with</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>
          <div className="flex space-x-4">
            <button onClick={handleSignIn} className="flex items-center justify-center w-full py-2 text-sm font-semibold text-gray-300 bg-[#1e1e1e] border border-gray-700 rounded hover:bg-gray-700">
              <FaGoogle className="mr-2" /> Google
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
