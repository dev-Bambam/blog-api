import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegistration = async (req, res) => {
   try {
      const { firstName, lastName, userName, email, password, bio, age } = req.body;

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
      });

      // token for authorisation
      const token = jwt.sign(
         {
            id: newUser._id,
         },
         process.env.SECRET_KEY,
         { expiresIn: "30min" }
      );

      await newUser.save();
      return res.status(200).json({
         status: "success",
         message: "new user created",
         token,
      });
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
      const filter = {};

      for (prop in query) {
         if (prop.endsWith('_gt')) {
            filter.prop.replace('_gt', '') = {$gt: Number(query[prop])}
         } else if(prop.endsWith('gte')) {
            filter.prop.replace('_gte', '') = {$gte: Number(query[prop])}
         } else if (prop.endsWith('_lt')) {
            filter.prop.replace('_lt', '') = {$lt: Number(query[prop])}
         } else if (prop.endsWith('_lte')) {
            filter.prop.replace('_lte', "") = {$lte: Number(query[prop])}
         } else {
            filter.prop = query.prop
         }
      }
   } catch (error) {
      return res.status(500).json({
         status: "error",
         message: error.message,
      });
   }
};
