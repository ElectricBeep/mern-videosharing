import express from "express";
import { addVideo, addView, deleteVideo, getBySearch, getByTags, getRandom, getSub, getTrend, getVideo, updateVideo } from "../controllers/video.js";

const router = express.Router();

//CREATE
router.post("/", addVideo);

//UPDATE
router.put("/:id", updateVideo);

//DELETE
router.delete("/id", deleteVideo);

//GET VIDEO
router.post("/find/:id", getVideo);

//INCREMENT VIEWES
router.put("/view/:id", addView);

//GET TRENDING VIDEOS
router.post("/trend", getTrend);

//GET RANDOM VIDEOS
router.post("/random", getRandom);

//GET SUBSCRIBED CHANNELS VIDEOS
router.post("/sub", getSub);

//GET VIDEOS BY TAGS
router.get("/tags", getByTags);

//GET VIDEOS BY SEARCH
router.get("/search", getBySearch);

export default router;