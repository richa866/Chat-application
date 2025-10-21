import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/useAuthStore";
import { Link, Navigate, NavLink } from "react-router-dom";
import { Eye,EyeOff } from "lucide-react";
export default function Login() {
    const[showpassword,setShowpassword]=useState(false);
    const navigate= useNavigate();
    const[formData,setFormData]=useState({email:"",password:""});
const{isLoggingIn,login}=useAuthStore();
const validateForm = async () => {
  if ( !formData.email || !formData.password) {
    console.log("enter all credentials");
    return;
  }

  try {
    await login(formData);  // wait until signup resolves
    navigate("/");           // only redirect if success
  } catch (err) {
    console.log("Login failed", err);
  }
};
    const handleSubmit=(e)=>{
        e.preventDefault();
     validateForm();
    }
  return (
     <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[linear-gradient(135deg,hsl(240,20%,6%)_0%,hsl(250,25%,8%)_50%,hsl(240,20%,6%)_100%)]">
  {/* Gradient blur effects */}
  <div className="fixed pointer-events-none z-0 w-96 h-96 top-20 -left-48 bg-[radial-gradient(circle,hsl(270,70%,50%)_0%,transparent_70%)] blur-[80px] opacity-30" />
  <div className="fixed pointer-events-none z-0 w-96 h-96 bottom-20 -right-48 bg-[radial-gradient(circle,hsl(320,85%,60%)_0%,transparent_70%)] blur-[80px] opacity-25" />

  <div className="w-full max-w-md relative z-10">
    <div className="rounded-2xl p-8 shadow-2xl bg-[hsl(235,30%,12%/0.6)] backdrop-blur-[20px] border border-[hsl(240,20%,30%/0.3)]">
      {/* Logo/Brand */}
      <div className="text-center mb-8">
        
        <h2 className="text-3xl font-bold bg-[linear-gradient(to_right,hsl(320,85%,60%),hsl(280,70%,55%),hsl(320,85%,60%))] bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="text-[hsl(240,5%,65%)] mt-2">
          Login to continue your journey
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-[hsl(0,0%,100%)]">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-[hsl(235,30%,18%)] border border-[hsl(235,30%,25%)] text-[hsl(0,0%,100%)] placeholder-[hsl(240,5%,65%)] focus:outline-none focus:ring-2 focus:ring-[hsl(320,85%,60%)] focus:border-[hsl(320,85%,60%)] transition-all duration-200"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-[hsl(0,0%,100%)]">
              Password
            </label>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showpassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-[hsl(235,30%,18%)] border border-[hsl(235,30%,25%)] text-[hsl(0,0%,100%)] placeholder-[hsl(240,5%,65%)] pr-10 focus:outline-none focus:ring-2 focus:ring-[hsl(320,85%,60%)] focus:border-[hsl(320,85%,60%)] transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowpassword(!showpassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(240,5%,65%)] hover:text-[hsl(0,0%,100%)] transition-colors"
            >
              {showpassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          
          className="w-full text-[hsl(0,0%,100%)] bg-[linear-gradient(to_right,hsl(320,85%,60%),hsl(280,70%,55%))] hover:opacity-90 transition-opacity p-3 rounded-2xl "
        >
           Log In
        </button>
      </form>

      {/* Sign up link */}
      <p className="mt-6 text-center text-sm text-[hsl(240,5%,65%)]">
        Not a member?{" "}
        <Link
          to="/signup"
          className="font-semibold text-[hsl(320,85%,60%)] hover:text-[hsl(320,85%,60%)/0.8] transition-colors"
        >
          Sign Up
        </Link>
      </p>
    </div>
  </div>
</div>

  );
}
