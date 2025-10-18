'use client'

import { useEffect, useState } from "react";
import MsgCard from "./MsgCard.jsx";
import AddUserForm from "./addUserForm.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./searchBar.jsx";
import MenuOptions from "./menu.jsx";

export default function ChatList() {
  const { logout, authUser, onlineUsers } = useAuthStore();
  const { getUsers, selectedUser, users, setSelectedUser, isUsersLoading, searchTerm, setSearchTerm } = useChatStore();
  const [addUser, setAddUser] = useState(false);
  const navigate = useNavigate();

  // Fetch users on mount
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isUsersLoading) return <div>LOADING...</div>;

  return (
    <>
      <nav className="sticky top-0 h-screen backdrop-blur-xl shadow-2xl p-4 transition-all duration-300">
        <div className="mb-4 border-b border-white/20">
          <div className="flex items-center gap-2">
            <div className="flex gap-1 justify-around w-full">
              <MenuOptions />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full p-2 max-w-full space-x-3 mb-4">
          <SearchBar />
          <button
            className="text-white/60 hover:text-white text-2xl p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setAddUser(true)}
          >
            +
          </button>
        </div>

        <div className="space-y-3 grid w-full">
          {(searchTerm ? filteredUsers : users).map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full text-left ${
                selectedUser?._id === user._id ? "bg-white/20" : ""
              } rounded-xl`}
            >
              <MsgCard
                username={user.username}
                profile={user?.profilePic}
                isOnline={onlineUsers.includes(user._id)}
              />
            </button>
          ))}
        </div>
      </nav>

      {/* Modal */}
      {addUser && (
        <AddUserForm
          onClose={() => setAddUser(false)}
        />
      )}
    </>
  );
}
