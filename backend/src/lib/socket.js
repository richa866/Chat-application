import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

//to send the messages  in real time
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

//store online useres
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  const userId = socket.handshake.query.userId;
  // 'socket.handshake' contains details about the initial connection request
  // between the client and the server. Think of it like a "virtual handshake"
  // that happens when the socket first connects.
  // The 'query' object inside handshake holds any extra data sent by the client
  // at connection time, like userId or auth tokens.
  // Example from frontend:
  // io("http://localhost:8000", { query: { userId: "12345" } })

  if (userId) userSocketMap[userId] = socket.id;
  // If there is a userId, save it with the current socket.id.
  // This helps us track which socket belongs to which user,
  // so we can send messages to the right person later.

  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  // it is used to send events to all the connected clients
  // "getOnlineUsers" -> the name of the event we are sending
  // Object.keys(userSocketMap) -> gives a list (array) of all userIds
  // currently connected (because we saved userId -> socket.id earlier)
  // In short: This sends the list of online user IDs to everyone connected.
  //   io → The main Socket.IO server instance.
  // emit → Means "send" or "broadcast" an event to clients.
  // getOnlineUsers → The name of the event so the frontend knows what type of data is coming.
  // Object.keys() → Gets all the keys (here, all userIds) from the userSocketMap object.
  // userSocketMap → A map that stores which user is connected to which socket.

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId]; // deleting the user that disconnected
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
}); //listens to any incoming messages

export { io, app, server };
