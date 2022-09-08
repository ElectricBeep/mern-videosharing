import express from "express";

import { deleteSavedVideo, getSavedVideos, deleteUser, dislike, getUser, like, saveVideo, subscribe, unsubscribe, update } from "../controllers/user.js";

const router = express.Router();

//UPDATE
router.put("/:id", update);

//DELETE
router.delete("/:id", deleteUser);

//GET A USER
router.get("/find/:id", getUser);

//SUBSCRIBE A USER
router.put("/sub/:id", subscribe);

//UNSUBSCRIBE A USER
router.put("/unsub/:id", unsubscribe);

//LIKE A VIDEO
router.put("/like/:videoId", like);

//DISLIKE A VIDEO
router.put("/dislike/:videoId", dislike);

//SAVE A VIDEO
router.put("/save/:videoId", saveVideo);

//DELETE SAVED VIDEO
router.put("/deletesave/:videoId", deleteSavedVideo);

//GET USER'S SAVED VIDEOS
router.post("/savedvideos/:userId", getSavedVideos);

export default router;