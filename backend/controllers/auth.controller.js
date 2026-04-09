import { User } from "../models/user.model.js";
import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isPasswordValid = await user.isCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  const safeUser = await User.findById(user._id).select("-password -refreshToken");
  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .json(
      new ApiResponse(200, { user: safeUser, accessToken }, "Login successful")
    );
});
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });
  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, {}, "Logged out successfully"));
});
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});
export { loginUser, logoutUser, getCurrentUser };