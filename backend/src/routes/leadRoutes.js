import express from "express";

import {
  createLead,
  getLeads,
  deleteLead
} from "../controllers/leadController.js";

const router = express.Router();

// Create lead
router.post("/", createLead);

// Get all leads
router.get("/", getLeads);

// Delete lead
router.delete("/:id", deleteLead);

export default router;