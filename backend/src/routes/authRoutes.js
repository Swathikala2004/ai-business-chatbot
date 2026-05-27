import express from "express";

import {
  signup,
  login
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);

// optional: register also points to same signup function
router.post("/register", signup);

router.post("/login", login);

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth routes working"
  });
});

router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

export default router;