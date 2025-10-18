import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDb } from "./lib/db.js";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
dotenv.config(); // once u write this u can access the env variables

// const app = express(); -deleting cause now i created it in socket.io

const port = process.env.PORT;
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
//will help u parse the data
app.use(cookieParser()); //will allow u to parse the cookie
app.use(
  cors({
    origin: "https://chat-application-s4pg.vercel.app/",
    credentials: true,
  })
);
//cors is used-CROSS ORIGIN POLICY- backend and frontend fcntion diff hosts so it blocks the req
//thats y we do this
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDb(); // connecting the db
});
