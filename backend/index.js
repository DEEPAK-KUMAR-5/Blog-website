import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectDB from "./db/db.js";
import app from "./app.js"


connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port http://localhost:${process.env.PORT}`);
    })
  })
  .catch((err) => {
    console.log("DB connection failed:", err);
    process.exit(1);
  })