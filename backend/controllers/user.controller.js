import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import { User } from "../models/user.model.js";
import { UploadCloud } from "../utility/Cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if ([name, email, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(409, "Email already in use");
  }
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }
  const avatar = await UploadCloud(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(500, "Avatar upload failed, please try again");
  }
  const user = await User.create({
    name,
    email,
    password,
    avatar: avatar.secure_url,
  });
  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});
export { registerUser };
