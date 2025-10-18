import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DATABASE SUCCESSFULLY CONNECTED");
  } catch (error) {
    console.log("ERROR IN CONNECTING DATABASE", error);
  }
};
