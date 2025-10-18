//like when the user wants to change his profile i need to see if he is logged in or no ...i need his cookies
//that time i need a middleware
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; //jwt is the name of the cookie that we gave in the  utils
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //verify does the opp work of parsing and checking the token
    //you parse it use=ing the same key that u used to sign it
    if (!decoded) {
      return res.status(401).json({ message: "invalid token " });
    }
    const user = await User.findById(decoded.userId).select("-password");
    //decoded userid becoz we need the same user whose cookie has been passed
    if (!user) {
      return res
        .status(401)
        .json({ message: "invalid token--user not found " });
    }
    req.user = user;
    //in this was anyone who wants the logged in user will get the data
    next();
  } catch (error) {
    console.log("ERROR IN PROTECT ROUTE", error);
    return res.status(400).json({ message: "error in protect route" });
  }
};
