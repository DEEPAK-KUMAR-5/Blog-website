import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  getMyPosts,
  updatePost,
  deletePost,
  toggleLike,
  toggleBookmark,
  getMyBookmarks,
} from "../controllers/post.controller.js";
import {
  addComment,
  getComments,
  deleteComment,
  editComment,
} from "../controllers/comment.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// Public routes
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/:id/comments", getComments);

// Protected routes — order matters: specific paths before /:id
router.use(verifyJWT);

router.get("/user/my", getMyPosts);
router.get("/user/bookmarks", getMyBookmarks);
router.post("/", upload.fields([{ name: "image", maxCount: 1 }]), createPost);
router.patch("/:id", upload.fields([{ name: "image", maxCount: 1 }]), updatePost);
router.delete("/:id", deletePost);
router.post("/:id/like", toggleLike);
router.post("/:id/bookmark", toggleBookmark);
router.post("/:id/comments", addComment);
router.patch("/:id/comments/:commentId", editComment);
router.delete("/:id/comments/:commentId", deleteComment);

export default router;
