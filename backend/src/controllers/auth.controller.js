// What you typically write inside controllers:
// Functions that handle specific requests (e.g., get user list, create a new user, update data).

// Logic to fetch or modify data, often by calling database models or services.

// Processing and validation of data before responding.

// Sending the final HTTP response (JSON, HTML, status codes).
import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

export const signup = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    //check the length of the password
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be equal to or greater than 6 " });
    }

    //check if the user exsists already
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "this email already exists" });
    }
    //hashpassword
    const hashedPassword = await bcrypt.hash(password, 10);
    //now create the new user

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    //check if the user has been creater or not
    console.log(newUser);
    if (newUser) {
      console.log("user created SUCCESSFULLY");
      //gen jwt tokens here
      await newUser.save();
      generateToken(newUser._id, res);

      res.status(201).json({
        _id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      });
    } else {
      return res.status(400).json({ message: "user NOT CREATED" });
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    return res
      .status(400)
      .json({ message: "error in signup controller", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }); // findin a user takes time isiliye await
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const pwCorrect = await bcrypt.compare(password, user.password);
    if (!pwCorrect) {
      return res.status(400).json({ message: "pw not correct" });
    }
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
    });
  } catch (error) {
    console.log("error in login controller");
    res
      .status(400)
      .json({ message: "issue with login controller", error: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 }); //name value how long the cookie will live
    res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    res.status(400).json({ message: "error in logout controller" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    // req.user._id; //we can acceess the proper user since this function was called after the protetc route
    if (!profilePic) {
      return res.status(401).json({ message: "profile pic required" });
    }
    const uploadRes = await cloudinary.uploader.upload(profilePic);
    const updateUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        profilePic: uploadRes.secure_url,
      },
      { new: true }
    );

    res.status(200).json(updateUser);
  } catch (error) {
    console.log("ERROR IN UPDATE PROFILE", error);
    res.status(400).json({ message: "Error in update profile " });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("ERROR IN CHECK AUTH CONTROLLER", error);
    return res.status(500).json({ message: "INTERNAL SERVER error" });
  }
};
