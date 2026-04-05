import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import connectDB from "./db/index.js";


const app = express();

connectDB();

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});