import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import { createError } from "../error.js";

//CREATE USER
export const signup = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try {
        const newUser = new User({
            ...req.body,
            password: hash
        });
        await newUser.save();
        res.status(200).json("User has been created!");
    } catch (err) {
        next(err);
    }
};

//LOGIN
export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ name: req.body.name });
        if (!user) return next(createError(404, "User not found!"));

        const isCorrect = bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) return next(createError(400, "Wrong credentials!"));

        //To not send password with response
        const { password, ...others } = user._doc;

        res.status(200).json(others);
    } catch (err) {
        next(err);
    }
};

//GOOGLE LOGIN
export const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(200).json(user._doc);
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true
            })
            const savedUser = await newUser.save();
            res.status(200).json(savedUser._doc);
        }
    } catch (err) {
        next(err);
    }
};