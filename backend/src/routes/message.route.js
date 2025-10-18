import express from "express";
import {
  getUsersForSidebar,
  addContact,
  getMessages,
  sendMessage,
  deleteMessage,
  getAllUsersInDb,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/users/add-contact", protectRoute, addContact);
router.get("/users", protectRoute, getUsersForSidebar);
router.get("/searchAllUsers", protectRoute, getAllUsersInDb);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.delete("/conversations/:userId", protectRoute, deleteMessage);
export default router;
