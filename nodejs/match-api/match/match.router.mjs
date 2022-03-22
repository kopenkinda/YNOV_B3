import { Router } from "express";
import {
  createMatch,
  deleteMatch,
  getMatchesById,
  getPaginatedMatches,
  updateWholeMatch,
  updatePartialMatch,
} from "./match.controller.mjs";
import { verifyMatchDto } from "./match.middlewares.mjs";

const router = Router();

router.get("/", getPaginatedMatches);
router.get("/:id", getMatchesById);
router.post("/", verifyMatchDto, createMatch);
router.put("/:id", verifyMatchDto, updateWholeMatch);
router.patch("/:id", verifyMatchDto, updatePartialMatch);
router.delete("/:id", deleteMatch);

export default router;
