import mongoose from "mongoose";

export const DBconnection = async () => {
   try {
      await mongoose.connect(process.env.MONGO_DB_URI);
      console.log("database connect successfully");
   } catch (error) {
      console.error(error);
   }
}
