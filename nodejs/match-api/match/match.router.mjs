import { Router } from "express";
import { unsupportedMethod } from "../global.middleware.mjs";
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
router.post("/", verifyMatchDto, createMatch);

router.get("/:id", getMatchesById);
router.put("/:id", verifyMatchDto, updateWholeMatch);
router.patch("/:id", verifyMatchDto, updatePartialMatch);
router.delete("/:id", deleteMatch);

router.all("*", unsupportedMethod);

export default router;
