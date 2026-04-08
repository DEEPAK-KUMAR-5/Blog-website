import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UploadCloud = async (filepath) => {
  try {
    if (!filepath) {
      console.log("❌ No filepath provided");
      return null;
    }

    const absolutePath = path.resolve(filepath);
    console.log("📤 Uploading:", absolutePath);

    const result = await cloudinary.uploader.upload(absolutePath, {
      resource_type: "auto",
    });

    console.log("✅ Upload success:", result.secure_url);

    // delete local file after upload
    fs.unlinkSync(absolutePath);

    return result;
  } catch (error) {
    console.log("❌ Cloudinary Error:", error);

    if (filepath && fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    return null;
  }
};

export { UploadCloud };