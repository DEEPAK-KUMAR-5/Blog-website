import { Post } from "../models/post.model.js";
import { Like } from "../models/like.model.js";
import { Bookmark } from "../models/bookmark.model.js";
import { UploadCloud } from "../utility/Cloudinary.js";
import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";

const createPost = asyncHandler(async (req, res) => {
  const { title, content, tags, isPublic } = req.body;

  if (!title || !content) {
    throw new ApiError(400, "Title and content are required");
  }

  let imageUrl = "";
  if (req.files?.image?.[0]?.path) {
    const uploaded = await UploadCloud(req.files.image[0].path);
    if (!uploaded) throw new ApiError(500, "Image upload failed");
    imageUrl = uploaded.secure_url;
  }

  const parsedTags = Array.isArray(tags)
    ? tags
    : tags
    ? tags.split(",").map((t) => t.trim())
    : [];

  const post = await Post.create({
    title,
    content,
    image: imageUrl,
    tags: parsedTags,
    isPublic: isPublic !== undefined ? isPublic : true,
    author: req.user._id,
  });

  await post.populate("author", "name avatar");

  return res
    .status(201)
    .json(new ApiResponse(201, post, "Post created successfully"));
});

const getAllPosts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;
  const tag = req.query.tag;
  const search = req.query.search;

  const filter = { isPublic: true };
  if (tag) filter.tags = tag;
  if (search) filter.title = { $regex: search, $options: "i" };

  const [posts, total] = await Promise.all([
    Post.find(filter)
      .populate("author", "name avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Post.countDocuments(filter),
  ]);

  return res.status(200).json(
    new ApiResponse(200, {
      posts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  );
});

const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  ).populate("author", "name avatar");

  if (!post) throw new ApiError(404, "Post not found");

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post fetched successfully"));
});

const getMyPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ author: req.user._id })
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Your posts fetched"));
});

const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new ApiError(404, "Post not found");

  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to edit this post");
  }

  const { title, content, tags, isPublic } = req.body;
  if (title) post.title = title;
  if (content) post.content = content;
  if (tags)
    post.tags = Array.isArray(tags)
      ? tags
      : tags.split(",").map((t) => t.trim());
  if (isPublic !== undefined) post.isPublic = isPublic;

  if (req.files?.image?.[0]?.path) {
    const uploaded = await UploadCloud(req.files.image[0].path);
    if (!uploaded) throw new ApiError(500, "Image upload failed");
    post.image = uploaded.secure_url;
  }

  await post.save();

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post updated successfully"));
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new ApiError(404, "Post not found");

  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to delete this post");
  }

  await post.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Post deleted successfully"));
});

const toggleLike = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;
  const existing = await Like.findOne({ post: postId, user: req.user._id });

  if (existing) {
    await existing.deleteOne();
    await Post.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } });
    return res
      .status(200)
      .json(new ApiResponse(200, { liked: false }, "Post unliked"));
  }

  await Like.create({ post: postId, user: req.user._id });
  await Post.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } });

  return res
    .status(200)
    .json(new ApiResponse(200, { liked: true }, "Post liked"));
});

const toggleBookmark = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;
  const existing = await Bookmark.findOne({ post: postId, user: req.user._id });

  if (existing) {
    await existing.deleteOne();
    return res
      .status(200)
      .json(new ApiResponse(200, { bookmarked: false }, "Bookmark removed"));
  }

  await Bookmark.create({ post: postId, user: req.user._id });

  return res
    .status(200)
    .json(new ApiResponse(200, { bookmarked: true }, "Post bookmarked"));
});

const getMyBookmarks = asyncHandler(async (req, res) => {
  const bookmarks = await Bookmark.find({ user: req.user._id })
    .populate({
      path: "post",
      populate: { path: "author", select: "name avatar" },
    })
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, bookmarks, "Bookmarks fetched"));
});

export {
  createPost,
  getAllPosts,
  getPostById,
  getMyPosts,
  updatePost,
  deletePost,
  toggleLike,
  toggleBookmark,
  getMyBookmarks,
};
