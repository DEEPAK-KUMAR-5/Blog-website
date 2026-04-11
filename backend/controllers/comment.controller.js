import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";

const addComment = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;
  const { text, parentComment } = req.body;

  if (!text?.trim()) {
    throw new ApiError(400, "Comment text is required");
  }

  const post = await Post.findById(postId);
  if (!post) throw new ApiError(404, "Post not found");

  const comment = await Comment.create({
    post: postId,
    user: req.user._id,
    text,
    parentComment: parentComment || null,
  });

  await comment.populate("user", "name avatar");

  return res
    .status(201)
    .json(new ApiResponse(201, comment, "Comment added"));
});

const getComments = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;

  const topLevel = await Comment.find({ post: postId, parentComment: null })
    .populate("user", "name avatar")
    .sort({ createdAt: -1 });

  const withReplies = await Promise.all(
    topLevel.map(async (comment) => {
      const replies = await Comment.find({ parentComment: comment._id })
        .populate("user", "name avatar")
        .sort({ createdAt: 1 });
      return { ...comment.toObject(), replies };
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, withReplies, "Comments fetched"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) throw new ApiError(404, "Comment not found");

  if (comment.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not allowed to delete this comment");
  }

  await Comment.deleteMany({ parentComment: comment._id });
  await comment.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment deleted"));
});

const editComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text?.trim()) throw new ApiError(400, "Text is required");

  const comment = await Comment.findById(req.params.commentId);
  if (!comment) throw new ApiError(404, "Comment not found");

  if (comment.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not allowed to edit this comment");
  }

  comment.text = text;
  await comment.save();

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment updated"));
});

export { addComment, getComments, deleteComment, editComment };
