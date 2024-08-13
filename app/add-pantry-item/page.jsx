'use client';
// app/pantry/add-pantry-item/page.jsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/firebase/clientApp";
import { useAuth } from "../context/AuthContext";
import { FaPlus } from "react-icons/fa";

export default function AddPantryItemPage({ currentUser }) {
  const router = useRouter();
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [expiryDate, setExpiryDate] = useState("");

  const { user, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const userId = user.uid;
      const pantryRef = collection(db, "users", userId, "pantry");

      await addDoc(pantryRef, {
        name: itemName,
        quantity: Number(quantity),
        expiryDate: new Date(expiryDate),
      });

      // Redirect to the pantry list page after adding the item
      router.push("/pantry");
    } catch (error) {
      console.error("Error adding item to pantry", error);
    }
  };

  return (
    <>
      <div className="p-6 bg-gray-700 rounded-lg space-y-4 max-w-3xl m-auto mt-20">
        <h1 className="text-3xl font-bold">Add Pantry Item</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex-1 bg-gray-600 p-2 rounded mt-2">
            <label className="text-gray-300" htmlFor="itemName">Item Name:</label>
            <input
              type="text"
              id="itemName"
              className="bg-gray-600 text-white border-none focus:outline-none w-full"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>
          <div className="flex-1 bg-gray-600 p-2 rounded mt-2">
            <label className="text-gray-300" htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              className="bg-gray-600 text-white border-none focus:outline-none w-full"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              required
            />
          </div>
          <div className="flex-1 bg-gray-600 p-2 rounded mt-2">
            <label className="text-gray-300" htmlFor="expiryDate">Expiry Date:</label>
            <input
              type="date"
              id="expiryDate"
              className="bg-gray-600 text-white border-none focus:outline-none w-full"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="mt-6 bg-teal-400 text-black p-2 rounded flex items-center space-x-2">
          <span>Add new item</span>
          <FaPlus />
        </button>
        </form>
      </div>
    </>
  );
}