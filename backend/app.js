import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";

const app = express();

app.use(cors())          
app.use(express.json())
app.use(express.urlencoded({ extended: true }))  //
app.use(cookieParser())   

app.use('/user', userRouter);

export default app;