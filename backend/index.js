// dotenv MUST be the very first thing — before any other import
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./db/db.js";
import app from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });