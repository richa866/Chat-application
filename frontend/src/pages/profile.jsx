import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
const navigate=useNavigate();
  const handleSaveChange=()=>{
navigate("/");
  }
  // handle file upload and update profile picture
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className=" pt-10 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(240, 20%, 6%) 0%, hsl(250, 25%, 8%) 50%, hsl(240, 20%, 6%) 100%)"
      }}
    >
      {/* Gradient Blurs - added inline */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="fixed w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(270,70%,50%) 0%, transparent 70%)",
            filter: "blur(80px)",
            opacity: 0.3,
            top: "10%",
            left: "15%",
          }}
        />
        <div
          className="fixed w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(320,85%,60%) 0%, transparent 70%)",
            filter: "blur(80px)",
            opacity: 0.25,
            top: "40%",
            right: "10%",
          }}
        />
        <div
          className="fixed w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(220,80%,55%) 0%, transparent 70%)",
            filter: "blur(80px)",
            opacity: 0.2,
            bottom: "10%",
            left: "20%",
          }}
        />
      </div>

      <div className="max-w-full  py-8 relative z-10 flex items-center justify-center  p-4">
        <div
          className="rounded-xl p-6 space-y-8 w-full max-w-xl"
          style={{ backgroundColor: "hsl(235,30%,12%)" }}
        >
          {/* Heading */}
          <div className="text-center flex flex-col items-center mb-8">
            <h1 className="text-2xl font-semibold text-white">Profile</h1>
            <p className="mt-2 text-zinc-300">Your profile information</p>
          </div>

          {/* Glass Card - inline glass effect */}
          <div
            className="rounded-3xl p-6 space-y-6"
            style={{
              background: "hsl(235,30%,12% / 0.6)",
              backdropFilter: "blur(20px)",
              border: "1px solid hsl(240,20%,30% / 0.3)"
            }}
          >
            {/* Avatar */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={selectedImg || authUser?.profilePic || "./assets/pfp.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-[hsl(235,30%,25%)]"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-0 right-0
                    bg-[hsl(235,40%,18%)] text-white p-2 rounded-full cursor-pointer
                    transition-all duration-200
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                  `}
                >
                  📷
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-sm text-zinc-400">
                {isUpdatingProfile
                  ? "Uploading..."
                  : "Click the camera icon to update your photo"}
              </p>
            </div>

            {/* Profile Details */}
            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400">Full Name</div>
                <p className="h-12 rounded-xl flex items-center px-3 text-white"
                  style={{ backgroundColor: "hsl(235,40%,18%)" }}>
                  {authUser?.username || "John Doe"}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400">✉️ Email Address</div>
                <p className="h-12 rounded-xl flex items-center px-3 text-white"
                  style={{ backgroundColor: "hsl(235,40%,18%)" }}>
                  {authUser?.email || "john@example.com"}
                </p>
              </div>

           
            </div>
          </div>

          {/* Account Info */}
          <div
            className="mt-6 rounded-xl p-6"
            style={{ backgroundColor: "hsl(235,30%,12%)" }}
          >
            <h2 className="text-lg font-medium mb-4 text-white">
              Account Information
            </h2>
            <div className="space-y-3 text-sm text-white">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0] || "2025-01-01"}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
          onClick={handleSaveChange}
            className="w-full h-12 rounded-xl font-medium text-base shadow-lg transition-all hover:shadow-xl"
            style={{
              backgroundColor: "hsl(320,85%,60%)",
              color: "hsl(0,0%,100%)",
              boxShadow: "0 4px 15px hsl(320,85%,60% / 0.3)"
            }}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
