'use client'
import React from "react";
import Link from "next/link";
import { signOut, signInWithGoogle } from "../../utils/firebase/auth";
import { useAuth } from '../context/AuthContext';
import { FaHome, FaList, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { LuChefHat } from "react-icons/lu";

export default function Navbar() {

	const { user, loading } = useAuth();

	const handleSignOut = event => {
		event.preventDefault();
		signOut();
	};

	const handleSignIn = event => {
		event.preventDefault();
		signInWithGoogle();
	};

	return (
		<>
			{user && <Link href="/add-pantry-item" className="fixed bottom-32 right-4 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-300">
				<FaPlus className="text-xl" />
			</Link>}
			<main className="flex flex-row items-center justify-between p-4 bg-green-900 fixed bottom-0 w-full">
				{user ? (
					<>
						{/* <Link href="/dashboard" className="flex flex-col items-center group">
							<FaHome className="text-white text-2xl group-hover:text-green-300" />
							<span className="text-white text-xs group-hover:text-green-300">Dashboard</span>
						</Link> */}
						<Link href="/pantry" className="flex flex-col items-center group">
							<FaList className="text-white text-2xl group-hover:text-green-300" />
							<span className="text-white text-xs group-hover:text-green-300">Pantry</span>
						</Link>
						{/* <Link href="/recipe" className="flex flex-col items-center group">
							<LuChefHat className="text-white text-2xl group-hover:text-green-300" />
							<span className="text-white text-xs group-hover:text-green-300">Cook</span>
						</Link> */}
						<div className="flex flex-col items-center group">
							<img className="w-8 h-8 rounded-full" src={user.photoURL || "/profile.png"} alt={user.email} />
							<span className="text-white text-xs group-hover:text-green-300">Profile</span>
						</div>
						<a href="#" onClick={handleSignOut} className="text-white text-xs hover:text-green-300 items-center flex flex-col">
							<FaSignOutAlt className="text-white text-2xl group-hover:text-green-300" />
							Sign Out
						</a>
					</>
				) : (
					<div className="flex flex-col items-center group">
						<a href="#" onClick={handleSignIn} className="text-white text-xs group-hover:text-green-300">
							<img className="w-8 h-8 rounded-full" src="/profile.png" alt="A placeholder user image" />
							Sign In with Google
						</a>
					</div>
				)}
			</main>
		</>
	);
}

