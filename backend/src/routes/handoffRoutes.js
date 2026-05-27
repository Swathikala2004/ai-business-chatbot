import express from "express";
import { createHandoff } from "../controllers/handoffController.js";

const router = express.Router();

router.post("/", createHandoff);

export default router;