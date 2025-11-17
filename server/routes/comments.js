import { Router } from "express";
const router = new Router();
import { checkAuth } from "../utils/checkAuth.js";
import {
  createComment,
  likeComment,
  unlikeComment,
} from "../controllers/comments.js";
// Like Comment
// http://localhost:8080/api/comments/:id/like
router.post("/:id/like", checkAuth, likeComment);

// Unlike Comment
// http://localhost:8080/api/comments/:id/unlike
router.post("/:id/unlike", checkAuth, unlikeComment);

// Create Comment
// http://localhost:8080/api/comments/:id
router.post("/:id", checkAuth, createComment);

export default router;
