import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
      firstName: {
         type: String,
         required: [true, "first name required"],
      },
      lastName: {
         type: String,
         required: [true, "last name required"],
      },
      userName: {
         type: String,
         required: [true, "userName required"],
         unique: true,
      },
      email: {
         type: String,
         required: [true, "email required"],
         unique: true,
      },
      password: {
         type: String,
         required: [true, "password required"],
      },
      bio: {
         type: String,
      },
      age: {
         type: Number
      },
      deleted: {
         type: Boolean,
         default: false,
         select: false,
      },
   },
   { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

export default User;
