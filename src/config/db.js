import mongoose from "mongoose";

export default async function DBconnection() {
   try {
      let dbUrl =
         "mongodb+srv://ayogood18:U1QgXKIewE4YCOKB@cluster0.s9rem.mongodb.net/bloggerAPI?retryWrites=true&w=majority&appName=Cluster0";
      await mongoose.connect(dbUrl);

      console.log("database connect successfully");
   } catch (error) {
      console.error(error);
   }
}
