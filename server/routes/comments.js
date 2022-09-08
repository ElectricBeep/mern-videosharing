import express from "express";

import { addComment, deleteComment, getComments, updateComment } from "../controllers/comment.js";

const router = express.Router();

//ADD COMMENT
router.post("/", addComment);

//UPDATE COMMENT
router.put("/:id", updateComment);

//DELETE COMMENT
router.post("/:id", deleteComment);

//GET COMMENTS
router.get("/:videoId", getComments);

export default router;