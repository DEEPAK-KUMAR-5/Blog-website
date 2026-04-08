import { asyncHandler } from "../utility/asyncHandler.js";
import {ApiError} from "../utility/ApiError.js"
import { User } from "../models/user.model.js";
import{UploadCloud} from "../utility/Cloudinary.js"
import { ApiResponse } from "../utility/ApiResponse.js";
import bcrypt from "bcrypt";

const registerUser=(asyncHandler(async(req,res)=>{
    const{name,email,password}=req.body
    if([name,email,password].some((field)=>{
        return field?.trim() === ""}
    )){
        throw new ApiError(400,"All fields are required")
    }
    const User_exist= await User.findOne({email})
    if(User_exist){
        throw new ApiError(409,"email already in use");
    }
    const avatar_localpath=req.files?.avatar?.[0]?.path;
    if (!avatar_localpath) {
        throw new ApiError(400,"Avatar require")
    }
    const avatar = await UploadCloud(avatar_localpath)  
    if(!avatar){
        throw new ApiError(400,"Error Upload again please")
    }
    const user =await User.create({
        name,
        avatar:avatar.url,
        email,
        password
    })
    const created_user = await User.findById(user._id).select(
        "-password -refreshTokken"
    )
    if (!created_user) {
        throw new ApiError(500,"something went wrong while registering")
    }
    return res.status(201).json(
        new ApiResponse(200,created_user,"User registered Successfully")
    )
}))

export {registerUser};