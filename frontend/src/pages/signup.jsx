import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
export default function Signup(){
    const[showpassword,setShowpassword]=useState(false);
    const navigate=useNavigate();
    const[formData,setFormData]=useState({username:"",email:"",password:""});
const{isSigningUp,signup}=useAuthStore();
const validateForm = async () => {
  if (!formData.username || !formData.email || !formData.password) {
    console.log("enter all credentials");
    return;
  }

  try {
    await signup(formData);  // wait until signup resolves
    navigate("/");           // only redirect if success
  } catch (err) {
    console.log("Signup failed", err);
  }
};
const handleSubmit=(e)=>{
    //handle the form when it submits
    e.preventDefault();
    validateForm();
    
}
return(
 <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[linear-gradient(135deg,hsl(240,20%,6%)_0%,hsl(250,25%,8%)_50%,hsl(240,20%,6%)_100%)]">
  {/* Gradient blur effects */}
  <div className="fixed pointer-events-none z-0 w-96 h-96 top-20 -left-48 bg-[radial-gradient(circle,hsl(270,70%,50%)_0%,transparent_70%)] blur-[80px] opacity-30" />
  <div className="fixed pointer-events-none z-0 w-96 h-96 bottom-20 -right-48 bg-[radial-gradient(circle,hsl(320,85%,60%)_0%,transparent_70%)] blur-[80px] opacity-25" />

  <div className="w-full max-w-md relative z-10">
    <div className="rounded-2xl p-8 shadow-2xl backdrop-blur-[20px] bg-[hsl(235,30%,12%/0.6)] border border-[hsl(240,20%,30%/0.3)]">
      
      {/* Logo/Brand */}
      <div className="text-center mb-8">
        
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[hsl(320,85%,60%)] via-[hsl(280,70%,55%)] to-[hsl(320,85%,60%)] bg-clip-text text-transparent">
          Create Account
        </h2>
        <p className="text-[hsl(240,5%,65%)] mt-2">
          Sign up to start your journey
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
         <div className="space-y-2">
          <label htmlFor="username" className="text-white text-sm font-medium p-1">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="username"
            required
            autoComplete="username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full px-3 py-2 rounded-md bg-[hsl(235,30%,18%)] border border-[hsl(235,30%,25%)] text-white placeholder-[hsl(240,5%,65%)] focus:outline-none focus:ring-2 focus:ring-[hsl(320,85%,60%)]"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-white text-sm font-medium">
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
            className="w-full px-3 py-2 rounded-md bg-[hsl(235,30%,18%)] border border-[hsl(235,30%,25%)] text-white placeholder-[hsl(240,5%,65%)] focus:outline-none focus:ring-2 focus:ring-[hsl(320,85%,60%)]"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-white text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showpassword ? "text" : "password"}
              required
              autoComplete="new-password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 rounded-md bg-[hsl(235,30%,18%)] border border-[hsl(235,30%,25%)] text-white pr-10 focus:outline-none focus:ring-2 focus:ring-[hsl(320,85%,60%)]"
            />
            <button
              type="button"
              onClick={() => setShowpassword(!showpassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(240,5%,65%)] hover:text-white transition-colors"
            >
              {showpassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        

        <button
          type="submit"
          
          className="w-full py-2 rounded-md bg-gradient-to-r from-[hsl(320,85%,60%)] to-[hsl(280,70%,55%)] text-white font-semibold hover:opacity-90 transition-opacity"
        >
         Sign Up
        </button>
      </form>

      {/* Login link */}
      <p className="mt-6 text-center text-sm text-[hsl(240,5%,65%)]">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-semibold text-[hsl(320,85%,60%)] hover:text-[hsl(320,85%,70%)] transition-colors"
        >
          Log In
        </a>
      </p>
    </div>
  </div>
</div>

 
);
}