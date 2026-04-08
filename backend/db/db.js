import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Remove these two lines ↓
// import dotenv from "dotenv";
// dotenv.config({ path: "../.env" });

const connectDB = async () => {
  try {
    const connectINS = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`\n DB CONNECTED ${connectINS.connection.host}`);
  } catch (error) {
    console.log("Error", error);
    process.exit(1);
  }
}

export default connectDB;