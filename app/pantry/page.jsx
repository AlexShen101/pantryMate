'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../utils/firebase/clientApp';
import { useAuth } from '../context/AuthContext';
import { FaSearch } from "react-icons/fa";
import PantryItem from './pantryitem';

export default function PantryPage() {
  const [pantryItems, setPantryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const { user, loading } = useAuth();

  useEffect(() => {
    if (user) {
      fetchPantryItems(user.uid)
    }
  }, [user, sortBy])

  const fetchPantryItems = async (userId) => {
    try {
      const pantryRef = collection(db, "users", userId, "pantry");
      let q;

      if (sortBy === "name") {
        q = query(pantryRef, orderBy("name"));
      } else if (sortBy === "expiryDate") {
        q = query(pantryRef, orderBy("expiryDate"));
      }

      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id
        }
      });

      console.log(items)

      setPantryItems(items);
    } catch (error) {
      console.error("Error fetching pantry items", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredItems = pantryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm)
  );


  return (
    <div>
      <header className="bg-teal-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Your Pantry</h1>
      </header>
      <div className="flex items-center border-2 border-gray-500 rounded-full px-4 py-2 w-80 mt-4">
          <input 
              type="text" 
              placeholder="Search..." 
              className="flex-grow outline-none text-lg bg-black text-white"
              value={searchTerm}
              onChange={handleSearchChange}
          />
          <FaSearch className="text-lg" />
      </div>
      <select className="px-4 py-2 hover:bg-gray-100 flex items-center text-black mt-4" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">Sort by Name</option>
        <option value="expiryDate">Sort by Expiry Date</option>
      </select>
      <ul className="mt-4 border-t-4">
        {filteredItems.map((item, index) => <PantryItem key={index} item={item} />)}
      </ul>
    </div>
  );
}
