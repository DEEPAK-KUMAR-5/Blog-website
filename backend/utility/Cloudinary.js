import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const UploadCloud = async (filepath) => {
  try {
    if (!filepath) return null;
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key:    process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const absolutePath = path.resolve(filepath);
    console.log("Uploading to Cloudinary:", absolutePath);
    const result = await cloudinary.uploader.upload(absolutePath, {
      resource_type: "auto",
    });
    console.log("Upload success:", result.secure_url);
    if (fs.existsSync(absolutePath)) fs.unlinkSync(absolutePath);
    return result;
  } catch (error) {
    console.error("Cloudinary Error:", error.message);
    if (filepath) {
      const abs = path.resolve(filepath);
      if (fs.existsSync(abs)) fs.unlinkSync(abs);
    }
    return null;
  }
};

export { UploadCloud };