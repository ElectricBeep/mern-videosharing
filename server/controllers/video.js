import Video from "../models/Video.js";
import User from "../models/User.js";
import { createError } from "../error.js";

//CREATE VIDEO
export const addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.body.userId, ...req.body });
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (err) {
        next(err);
    }
};

//UPDATE VIDEO
export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found!"));

        if (req.body.userId === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(200).json(updatedVideo);
        } else {
            return next(createError(403, "You can update only your video!"));
        }
    } catch (err) {
        next(err);
    }
};

//DELETE VIDEO
export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found!"));

        if (req.body.userId === video.userId) {
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("Video deleted successfully!");
        } else {
            return next(createError(403, "You can delete only your video!"));
        }
    } catch (err) {
        next(err);
    }
};

//GET VIDEO
export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
    } catch (err) {
        next(err);
    }
};

//ADD VIEW TO A VIDEO
export const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        });
        res.status(200).json("The view count has been increased!");
    } catch (err) {
        next(err);
    }
};

//GET RANDOM VIDEOS
export const getRandom = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

//GET TRENDING VIDEOS
export const getTrend = async (req, res, next) => {
    try {
        //Sorting by views and returning the most viewed videos
        const videos = await Video.find().sort({ views: -1 });
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

//GET VIDEOS FROM SUBBED USER
export const getSub = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.userId);
        const subscribedChannels = user.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels.map((channelId) => {
                return Video.find({ userId: channelId });
            })
        );
        //Using flat method to prevent nested array
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
        next(err);
    }
};

//GET VIDEOS BY TAGS
export const getByTags = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    try {
        const videos = await Video.find({ tags: { $in: tags } }).limit(20);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

//GET VIDEOS BY SEARCH
export const getBySearch = async (req, res, next) => {
    const query = req.query.q;
    try {
        const videos = await Video.find({
            title: { $regex: query, $options: "i" },
        }).limit(40);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};