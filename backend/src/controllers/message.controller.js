import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  //i need all users that the RECEIVER has contacted with apart from the RECEIVER
  try {
    const loggedInUser = req.user;
    const filteredUsers = await User.find({
      _id: { $in: loggedInUser.contacts, $ne: loggedInUser._id },
    }).select("-password");
    res.status(201).json(filteredUsers);
  } catch (error) {
    console.log("error in getusersSlidebar function", error);
    res.status(401).json({ message: "ERROR IN USERS FOR SLIDEBAR" });
  }
};

// export const addContact = async (req, res) => {
//   try {
//     const loggedInUser = req.user;
//     const { username } = req.body;
//     const contactId = await User.findOne({ username });
//     if (!contactId) {
//       return res.status(400).json({ message: "THE USER DOES NOT EXSISTS" });
//     }
//     if (loggedInUser._id.toString() === contactUser._id.toString()) {
//       return res
//         .status(400)
//         .json({ message: "You cannot add yourself as a contact" });
//     }
//     // already exsists
//     if (loggedInUser.contacts.includes(contactUser._id)) {
//       return res.status(400).json({ message: "User already in contacts" });
//     }
//     loggedInUser.contacts.push(contactId._id);
//     await loggedInUser.save();
//     res.status(201).json({ message: "new contact saved" });
//   } catch (error) {
//     console.log("ERROR IN ADD CONTACT FUNCTION", error);
//     return res.status(400).json({ message: "ERROR IN ADD CONTACTS" });
//   }
// };

export const getMessages = async (req, res) => {
  try {
    const { id: UserToChatWith } = req.params; // remaming id wala part
    //req.params is used to capture dynamic parts of the URL.
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, reciverId: UserToChatWith },
        { senderId: UserToChatWith, reciverId: myId },
      ],
    });
    console.log("Fetched Messages:", messages);
    res.status(200).json(messages);
  } catch (error) {
    console.log("ERROR IN ADD get messages FUNCTION", error);
    res.status(400).json({ message: "ERROR IN get messages" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user._id;
    let Imageurl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      Imageurl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      reciverId,
      text,
      image: Imageurl,
    });
    await newMessage.save();
    const ReceiverSocketId = getReceiverSocketId(reciverId);
    if (ReceiverSocketId) {
      io.to(ReceiverSocketId).emit("newMessage", newMessage);
      //we didnt use just io.emit()since it will broadcast it to everyone --
      //therefore we specifiy the socket id
    }

    res.status(200).json(newMessage);
  } catch (error) {
    console.log("ERROR IN ADD send messages FUNCTION", error);
    res.status(400).json({ message: "ERROR IN send messages" });
  }
};

export const addContact = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { username } = req.body;
    const contactUser = await User.findOne({ username });

    if (!contactUser) {
      return res.status(400).json({ message: "The user does not exist" });
    }

    if (loggedInUser._id.toString() === contactUser._id.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot add yourself as a contact" });
    }

    if (loggedInUser.contacts.includes(contactUser._id)) {
      return res.status(400).json({ message: "User already in contacts" });
    }

    loggedInUser.contacts.push(contactUser._id);
    await loggedInUser.save();

    res.status(201).json(contactUser);
  } catch (error) {
    console.log("ERROR IN ADD CONTACT FUNCTION", error);
    return res.status(400).json({ message: "ERROR IN ADD CONTACTS" });
  }
};

export const deleteMessage = async (req, res) => {
  const { userId: UserToChatWith } = req.params;
  const myId = req.user._id;

  try {
    const deleting = await Message.deleteMany({
      $or: [
        { senderId: myId, reciverId: UserToChatWith },
        { senderId: UserToChatWith, reciverId: myId },
      ],
    });

    if (deleting.deletedCount === 0) {
      return res.status(200).json({
        success: true,
        message:
          "No messages found between users to delete. FUNCTION SUCCESSFUL",
      });
    }

    return res.status(200).json({
      success: true,
      message: `${deleting.deletedCount} messages deleted successfully from conversation.`,
    });
  } catch (error) {
    console.error("Error clearing conversation:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to clear conversation. Server error.",
    });
  }
};

export const getAllUsersInDb = async (req, res, next) => {
  try {
    //find all remove pw since we need username
    const users = await User.find().select("-password");

    // Check if any users were found
    if (!users) {
      return res.status(404).json({ message: "No users found." });
    }

    return res.status(200).json(users);
  } catch (error) {
    // Log the error for server-side debugging
    console.error("Error in getAllUsersInDb controller:", error);

    next(error);
  }
};
