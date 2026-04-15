import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./db/db.js";
import app from "./app.js";
const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });