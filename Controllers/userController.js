import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const userRegistration = async (req, res) => {
   try {
      const { firstName, lastName, userName, email, password, bio } = req.body;

      const existingUser = await User.find({ $or: [{ email }, { userName }] });
      if (existingUser) {
         return res.status(400).json({
            status: "fail",
            message: "user already exist",
         });
      }
      // hash password
      const saltRound = 10;
      const hashedPassword = await bcrypt.hash(password, saltRound);

      const newUser = new User({
         firstName,
         lastName,
         userName,
         email,
         password: hashedPassword,
         bio,
      });

      await newUser.save();
   } catch (error) {
      return res.status(401).json({
         status: "fail",
         message: {
            error: error.message,
         },
      });
   }
};

export const userLogin = async (req, res) => {
   try {
      const { email, password } = req.body;

      const registeredUser = await User.findOne({ email });
      if (!registeredUser) {
         return res.status(400).json({
            status: "fail",
            message: "user not registered or invalid email",
         });
      }

       //check for incorrect password
       const correctPassword = await bcrypt.compare(password, registeredUser.password);
       if (!correctPassword) {
           return res.status(401).json({
               status: 'fail',
               message: 'incorrect password'
           })
       } else {
           return res.status(200).json({
               status: 'success',
               message: 'user logged in'
           })
       }
   } catch (error) {
       return res.status(401).json({
           status: 'error',
           message: {
               error: error.message
           }
       })
   }
};
