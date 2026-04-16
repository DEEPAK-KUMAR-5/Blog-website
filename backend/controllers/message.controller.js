import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../index.js";

const sendMessage = asyncHandler(async (req, res) => {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;

    if (!message) {
        throw new ApiError(400, "Message content is required");
    }

    // 1. Find or create conversation
    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId],
        });
    }

    // 2. Create message
    const newMessage = await Message.create({
        senderId,
        receiverId,
        message,
    });

    if (newMessage) {
        conversation.lastMessage = newMessage._id;
        await conversation.save();
    }

    // 3. REAL-TIME LOGIC: Send message to receiver via Socket.io
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
        // io.to() sends to a specific client
        io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res
        .status(201)
        .json(new ApiResponse(201, newMessage, "Message sent successfully"));
});

const getMessages = asyncHandler(async (req, res) => {
    const { id: userToChatId } = req.params;
    const senderId = req.user?._id;

    // Find conversation and populate the messages
    const conversation = await Conversation.findOne({
        participants: { $all: [senderId, userToChatId] }
    });

    if (!conversation) {
        return res
            .status(200)
            .json(new ApiResponse(200, [], "Start a new conversation!"));
    }

    // Fetch all messages belonging to this chat
    const messages = await Message.find({
        $or: [
            { senderId: senderId, receiverId: userToChatId },
            { senderId: userToChatId, receiverId: senderId }
        ]
    }).sort({ createdAt: 1 });

    return res
        .status(200)
        .json(new ApiResponse(200, messages, "Messages fetched successfully"));
});

const getConversations = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    // Find all conversations where the current user is a participant
    const conversations = await Conversation.find({
        participants: userId 
    })
    .populate("participants", "name avatar") // Get the names and pictures
    .populate("lastMessage")                 // Get the preview of the last text
    .sort({ updatedAt: -1 });                // Sort by newest first

    return res
        .status(200)
        .json(new ApiResponse(200, conversations, "Conversations fetched successfully"));
});

export { sendMessage, getMessages, getConversations };
