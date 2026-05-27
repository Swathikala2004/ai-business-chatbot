import express from "express";
import { trainWebsite } from "../controllers/urlTrainingController.js";

const router = express.Router();

router.post("/", trainWebsite);

export default router;