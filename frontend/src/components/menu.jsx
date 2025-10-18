import { useState } from "react";
import pfp from "../assets/pfp.png";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
 
 
 export default function MenuOptions(){
     const [menuOpen, setMenuOpen] = useState(false);
      const navigate = useNavigate();
      const {logout, authUser,onlineUsers}=useAuthStore();
      
  const handleLogout = () => {
    console.log("Logout clicked");
    logout();
navigate("/login");
  }

  const handleProfile = () => {
    console.log("Profile clicked")
    setMenuOpen(false)
     navigate("/profile");
  }
  const handleSettings = () => {
    console.log("Settings clicked")
    setMenuOpen(false)
  }
    return(
 <div className="mb-8 border-b border-white/10 w-full">
          <div className="relative flex items-center justify-between ">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              onBlur={(e) => {
                
                if (!e.currentTarget.closest(":focus-within")) setMenuOpen(false)
              }}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              className="flex items-center  gap-3 rounded-xl w-3xl px-3 py-4 bg-white/10 hover:bg-white/15  text-white/90 transition-colors"
            >
              <img src={authUser?.profilePic|| pfp} alt="User avatar" className="w-10 h-10 rounded-full object-cover" />
              <span className="text-xl font-medium">Account</span>
              <svg
                className={`w-4 h-4 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute z-100 top-12 left-0 min-w-[180px] rounded-xl overflow-hidden border border-white/20 bg-black/70 backdrop-blur-xl shadow-2xl"
              >
                <button
                  role="menuitem"
                  onClick={handleProfile}
                  className="w-full text-left px-4 py-2 text-white/90 hover:bg-white/15 transition-colors"
                >
                  PROFILE
                </button>
                <button
                  role="menuitem"
                  onClick={handleSettings}
                  className="w-full text-left px-4 py-2 text-white/90 hover:bg-white/15 transition-colors"
                >
                  SETTINGS
                </button>
                <button
                  role="menuitem"
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-pink-200 hover:bg-white/15 transition-colors"
                >
                  LOGOUT
                </button>
              </div>
            )}
          </div>
        </div>
    )

 }