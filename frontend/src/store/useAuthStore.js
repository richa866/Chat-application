import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  socket: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  incomingCall: null, // new state
  inCall: false, // new state
  onlineUsers: [],
  peerConnection: null,
  setPeerConnection: (pc) => set({ peerConnection: pc }),
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check", {
        withCredentials: true,
      });

      //basically the path for the /check route
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("ERROR IN CHECKAUTH", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }

    //         Steps inside:

    // Calls GET /auth/check using your axios instance.

    // If request succeeds → it updates the store with authUser: res.data (so the user info is now stored globally).

    // If request fails (maybe token expired, user not logged in, or server error) → it logs the error and sets authUser: null.

    // Finally → it sets isCheckingAuth to false (so your UI knows auth checking is done).
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    //setting the flag true
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      //this will eventually send the data to the controller tht will perform the functions
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
      return res.data;
    } catch (error) {
      console.log("error in signup part", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      console.log("logged out suceesfully");
      toast.success("Logged Out  successfully");
      get().disconnectSocket();
    } catch (error) {
      console.log("ERROR IN LOGOUT AUTH STORE", error);
      toast.error(error.response.data.message);
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    //setting the flag true
    try {
      const res = await axiosInstance.post("/auth/login", data);
      //this will eventually send the data to the controller tht will perform the functions
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      console.log("error in login part", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data, {
        withCredentials: true, // VERY IMPORTANT
      });
      //this will eventually send the data to the controller tht will perform the functions
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in profile part", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    //check the the user is authenticated or no
    //if the socket already exsits dont connect again

    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id, // will be passed to socket.js file in backend
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (users) => {
      set({ onlineUsers: users });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
  },
}));
