import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }
  const token = jwt.sign(
    { _id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  const safeUser = await User.findById(user._id).select("-password");
  return res.status(200).json(
    new ApiResponse(200, { user: safeUser, token }, "Login successful")
  );
});
export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.header("Authorization")?.replace("Bearer ", "") || null;
  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded._id).select("-password");
  if (!user) {
    throw new ApiError(401, "Invalid token");
  }
  req.user = user;
  next();
});
export const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(200, req.user, "User fetched successfully")
  );
});