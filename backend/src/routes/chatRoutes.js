import express from "express";

import {
  chatWithAI,
  getConversations
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/", chatWithAI);

router.get("/history", getConversations);

export default router;