import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

const app = express();

app.use(cors({
  origin: "https://voluble-heliotrope-cbb6c7.netlify.app",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/posts", postRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statuscode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [],
  });
});

export default app;