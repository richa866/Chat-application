import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  allUsers: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isAddingContact: false,
  isChatbotOpen: false,
  isAllUsersLoading: false,
  searchTerm: "",

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      console.log("ERROR IN GET USERS STORE", error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getAllUsers: async () => {
    set({ isAllUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/searchAllUsers");
      set({ allUsers: res.data });
    } catch (error) {
      console.log("ERROR IN GET all USERS STORE", error);
    } finally {
      set({ isAllUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log("ERROR IN GET USERS STORE", error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  addContact: async (data) => {
    set({ isAddingContact: true });
    try {
      const res = await axiosInstance.post("/messages/users/add-contact", data);
      // const { getUsers } = useChatStore.getState();
      // await getUsers(); // refresh the users list
      set((state) => ({
        users: [...state.users, res.data],
      }));
      console.log(users);
    } catch (error) {
      console.log("ERROR IN add USERS STORE", error);
    } finally {
      set({ isAddingContact: false });
    }
  },

  setSelectedUser: async (selectedUser) => {
    set({ selectedUser });
  },

  sendMessage: async (msgData) => {
    const { selectedUser, messages } = get();
    console.log("Selected User:", selectedUser);
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        msgData
      );
      set({
        messages: [...messages, res.data],
      });
    } catch (error) {
      console.log("ERROR IN sending message STORE", error);
    }
  },

  subscribeMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  setIsChatbotOpen: (value) => set({ isChatbotOpen: value }),

  clearChat: async (userId, currentUserId) => {
    try {
      const res = await axiosInstance.delete(
        `/messages/conversations/${userId}`
      );

      set((state) => ({
        ...state,
        messages: state.messages.filter((message) => {
          const isCurrentConversation =
            (message.senderId === currentUserId &&
              message.reciverId === userId) ||
            (message.senderId === userId &&
              message.reciverId === currentUserId);

          return !isCurrentConversation;
        }),
      }));
      return res.data;
    } catch (error) {
      console.log("ERROR IN deleting  USERS STORE", error);
    }
  },

  setSearchTerm: (term) => set({ searchTerm: term }),
}));
