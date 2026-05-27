import express from "express";

import {
  createPayment,
  checkPaymentStatus
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create", createPayment);
router.get("/status/:orderId", checkPaymentStatus);

export default router;