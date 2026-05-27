import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import {
  uploadDocument,
  getDocuments,
  deleteDocument
} from "../controllers/documentController.js";

const router = express.Router();

// Upload document
router.post(
  "/upload",
  upload.single("file"),
  uploadDocument
);

// Get all documents
router.get("/", getDocuments);

// Delete document
router.delete("/:id", deleteDocument);

export default router;