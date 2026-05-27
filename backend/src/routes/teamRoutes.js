import express from "express";

import {
  addTeamMember,
  getTeamMembers,
  deleteTeamMember
} from "../controllers/teamController.js";

const router = express.Router();

router.post("/", addTeamMember);
router.get("/", getTeamMembers);
router.delete("/:id", deleteTeamMember);

export default router;