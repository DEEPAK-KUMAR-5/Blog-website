import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// dotenv is already loaded in index.js before anything else,
// but we re-read here as a safety net for when this module
// loads before index.js finishes (e.g. during testing).
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UploadCloud = async (filepath) => {
  try {
    if (!filepath) return null;

    // Re-apply config every call so env vars are always fresh
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

    // Delete temp file after successful upload
    if (fs.existsSync(absolutePath)) fs.unlinkSync(absolutePath);

    return result;
  } catch (error) {
    console.error("Cloudinary Error:", error.message);
    // Clean up temp file even on failure
    if (filepath) {
      const abs = path.resolve(filepath);
      if (fs.existsSync(abs)) fs.unlinkSync(abs);
    }
    return null;
  }
};

export { UploadCloud };