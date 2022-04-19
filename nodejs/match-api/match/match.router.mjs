import { Router } from "express";
import { allowedRoles, checkToken } from "../common/auth.utils.js";
import { unsupportedMethod } from "../global.middleware.mjs";
import {
  createMatch,
  deleteMatch,
  getMatchesById,
  getPaginatedMatches,
  updatePartialMatch,
  updateWholeMatch,
} from "./match.controller.mjs";
import { verifyMatchDto } from "./match.middlewares.mjs";

const router = Router();

router.get(
  "/",
  checkToken(true),
  allowedRoles(["admin", "contributor", "guest"]),
  getPaginatedMatches
);
router.post(
  "/",
  checkToken(),
  allowedRoles(["admin", "contributor"]),
  verifyMatchDto,
  createMatch
);

router.get(
  "/:id",
  checkToken(true),
  allowedRoles(["admin", "contributor", "guest"]),
  getMatchesById
);
router.put(
  "/:id",
  checkToken(),
  allowedRoles(["admin", "contributor"]),
  verifyMatchDto,
  updateWholeMatch
);
router.patch(
  "/:id",
  checkToken(),
  allowedRoles(["admin", "contributor"]),
  verifyMatchDto,
  updatePartialMatch
);
router.delete("/:id", checkToken(), allowedRoles(["admin"]), deleteMatch);

router.all("*", unsupportedMethod);

export default router;
