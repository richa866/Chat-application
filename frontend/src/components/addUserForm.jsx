'use client'

import { useState, useEffect } from 'react'
import { useChatStore } from '../store/useChatStore';

export default function AddUserForm({ onClose }) {
  const [name, setName] = useState("");
  const { addContact, users, allUsers, getAllUsers,isAllUsersLoading  } = useChatStore();

  // Fetch all users from DB when modal opens
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);
console.log(allUsers)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return console.log("Please enter a username");
    if (!allUsers.length) return console.log("Users are still loading");

    const userExistsInDb = allUsers.some(
      user => user.username.toLowerCase() === name.trim().toLowerCase()
    );
    const userAlreadyAdded = users.some(
      user => user.username.toLowerCase() === name.trim().toLowerCase()
    );

    if (!userExistsInDb) return console.log("User does not exist in DB");
    if (userAlreadyAdded) return console.log("User is already added");

    try {
      await addContact({ username: name });
      setName(""); // clear input
      onClose();   // notify parent to close modal
    } catch (err) {
      console.log("Error adding contact:", err);
    }
  };

  // Live validation text
  const validationText = name
    ?  isAllUsersLoading
      ? "Loading users..."
      : !allUsers.some(u => u.username.toLowerCase() === name.trim().toLowerCase())
      ? "User not found ❌"
      : users.some(u => u.username.toLowerCase() === name.trim().toLowerCase())
      ? "Already added ⚠️"
      : "User exists ✅"
    : "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden flex flex-col justify-around w-full h-56 border border-purple-300/30 rounded-2xl bg-white/10 backdrop-blur-xl p-6 shadow-2xl"
        >
          <h2 className="font-extrabold text-2xl text-purple-300 mb-2">Add New Contact</h2>
          <p className="text-white/80 text-sm mb-3">
            Enter a username to add them to your chat contacts
          </p>

          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/10 backdrop-blur-sm outline-none border border-purple-300/30 text-white placeholder-purple-200/60 rounded-xl block w-full p-3"
                placeholder="Enter username..."
                autoFocus
              />
              {name && (
                <p className="text-sm text-white/70 mt-1">{validationText}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium"
            >
              Add
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60"
          >
            ✕
          </button>
        </form>
      </div>
    </div>
  );
}
