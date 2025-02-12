import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const userRegistration = async (req, res) => {
   try {
      const { firstName, lastName, userName, email, password, bio } = req.body;

      const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
      if (existingUser) {
         return res.status(403).json({
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
      return res.status(403).json({
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
            status: "fail",
            message: "incorrect password",
         });
      } else {
         return res.status(200).json({
            status: "success",
            message: "user logged in",
         });
      }
   } catch (error) {
      return res.status(403).json({
         status: "error",
         message: {
            error: error.message,
         },
      });
   }
};

export const getAllUsers = async (req, res) => {
   try {
      const query = req.query;

      if (!query) {
         const allUsers = await User.find({});

         if (allUsers.length !== 0) {
            return res.status(200).json({
               status: "success",
               count: allUsers.length,
               data: {
                  allUsers,
               },
            });
         } else {
            return res.status(404).json({
               status: "fail",
               message: "not user found",
            });
         }
      } else {
         const allUsers = await User.find(query);
         console.log(query)
         if (allUsers.length === 0) {
            return res.status(404).json({
               status: 'fail',
               message: 'user not found'
            })
         }

         return res.status(200).json({
            status: 'success',
            counts: allUsers.length,
            data: {
               allUsers
            }
         })
      }
   } catch (error) {}
};
