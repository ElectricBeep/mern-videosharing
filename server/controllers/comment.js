import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import { createError } from "../error.js";

//ADD COMMENT
export const addComment = async (req, res, next) => {
    const newComment = new Comment({ ...req.body, userId: req.body.userId });
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        next(err);
    }
}

//UPDATE COMMENT
export const updateComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
    } catch (err) {
        next(err);
    }
}

//DELETE COMMENT
export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(req.params.id);
        if (req.body.userId === comment.userId || req.body.userId === video.userId) {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("Comment was deleted!")
        } else {
            return next(createError(403, "You can delete only your comments!"));
        }
    } catch (err) {
        next(err);
    }
}

//GET COMMENTS
export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId });
        res.status(200).json(comments);
    } catch (err) {
        next(err);
    }
}