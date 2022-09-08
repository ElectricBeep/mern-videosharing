import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

//UPDATE
export const update = async (req, res, next) => {
    if (req.params.id === req.body.userId) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(200).json(updatedUser);
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can update only your account!"));
    }
};

//DELETE
export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.body.userId) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted!");
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can delete only your account!"));
    }
};

//GET A USER
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

//SUBSCRIBE
export const subscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.userId, {
            $push: { subscribedUsers: req.params.id }
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        });
        res.status(200).json("Subscription successfull!");
    } catch (err) {
        next(err);
    }
};

//UNSUBSCRIBE
export const unsubscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.userId, {
            $pull: { subscribedUsers: req.params.id }
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: - 1 }
        });
        res.status(200).json("Unsubscription successfull!");
    } catch (err) {
        next(err);
    }
};

//LIKE
export const like = async (req, res, next) => {
    const id = req.body.userId;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id }
        })
        res.status(200).json("The video has been liked.")
    } catch (err) {
        next(err);
    }
};

//DISLIKE
export const dislike = async (req, res, next) => {
    const id = req.body.userId;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }
        })
        res.status(200).json("The video has been disliked.");
    } catch (err) {
        next(err);
    }
};

//SAVE VIDEO
export const saveVideo = async (req, res, next) => {
    const id = req.body.userId;
    const videoId = req.params.videoId;
    try {
        const user = await User.findByIdAndUpdate(id, {
            $addToSet: { savedVideos: videoId }
        }, { new: true });
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

//DELETE SAVED VIDEO
export const deleteSavedVideo = async (req, res, next) => {
    const id = req.body.userId;
    const videoId = req.params.videoId;
    try {
        const user = await User.findByIdAndUpdate(id, {
            $pull: { savedVideos: videoId }
        }, { new: true });
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

//GET SAVED VIDEOS
export const getSavedVideos = async (req, res, next) => {
    const id = req.body.userId;
    try {
        const user = await User.findById(id);
        const videos = await Promise.all(
            user.savedVideos.map((videoId) => {
                return Video.findById(videoId)
            })
        );
        let videoList = [];
        videos.map((video) => {
            const { _id, userId, title, desc, imgUrl, videoUrl, views, tags, likes, dislikes, createdAt, updatedAt } = video;
            videoList.push({ _id, userId, title, desc, imgUrl, videoUrl, views, tags, likes, dislikes, createdAt, updatedAt });
        });
        res.status(200).json(videoList);
    } catch (err) {
        next(err);
    }
};