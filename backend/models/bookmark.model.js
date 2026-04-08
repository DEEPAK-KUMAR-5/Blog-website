import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
bookmarkSchema.index({ post: 1, user: 1 }, { unique: true });
export const Bookmark = mongoose.model("Bookmark", bookmarkSchema);