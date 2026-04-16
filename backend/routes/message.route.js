import { Router } from "express";
import { sendMessage, getMessages, getConversations } from "../controllers/message.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT); // Protect all chat routes

router.route("/conversations").get(getConversations);
router.route("/send/:id").post(sendMessage);
router.route("/:id").get(getMessages);

export default router;