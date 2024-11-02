import User from "../models/UsersModel.js";
import bcrypt from 'bcrypt';
import Profile from "../models/ProfilesModel.js";
import crypto from "crypto";
import PDFDocument from 'pdfkit';
import fs from 'fs';
import ConnectionRequest from "../models/ConnectionsModel.js";
import Post from "../models/PostsModel.js";
import Comment from "../models/CommentsModel.js";
import { profile } from "console";

const convertUserDataToPDF = async (userData) => {
    const doc = new PDFDocument();

    const outputPath = crypto.randomBytes(32).toString("hex") + ".pdf";
    const stream = fs.createWriteStream("uploads/" + outputPath);

    doc.pipe(stream);

    doc.image(`uploads/${userData.userId.profilePicture}`, { align: "center", width: 100 })

    doc.moveDown(9);


    doc.fontSize(14).text(`Name : ${userData.userId.name}`);
    doc.fontSize(14).text(`Username : ${userData.userId.username}`);
    doc.fontSize(14).text(`Email : ${userData.userId.email}`);
    doc.fontSize(14).text(`Bio : ${userData.bio}`);
    doc.fontSize(14).text(`Current Position : ${userData.currentPost}`);

    doc.fontSize(14).text("Past Work :")
    userData.pastWork.forEach((work, idx) => {
        doc.fontSize(14).text(`Company Name : ${work.company}`);
        doc.fontSize(14).text(`Position : ${work.position}`);
        doc.fontSize(14).text(`Years : ${work.years}`);
    })

    doc.end();

    return outputPath;
}


export const register = async (req, res) => {
    console.log("Register route hit"); // Debugging line
    console.log(req.body);
    try {
        let { name, email, username, password } = req.body;

        let userExists = await User.findOne({ email });
        console.log('User exists:', userExists);
        if (userExists) {
            return res.status(400).json({ message: "user already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword,
            email: email,
        })

        await newUser.save().catch((error) => {
            console.error("Mongoose Error:", error);
            res.status(400).json({ message: "Registration failed", error: error.message });
        });
        const profile = new Profile({ userId: newUser._id });
        await profile.save();
        return res.json({ message: "user created !" });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ message: "Server error" });
    }
}


export const login = async (req, res) => {
    console.log("login route hit");
    try {
        let { email, password } = req.body;

        let userFound = await User.findOne({ email });
        if (!userFound) return res.status(404).json({ message: " User does not exist" });

        let isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(401).json({ message: "invalid credentials" });

        const token = crypto.randomBytes(32).toString("hex");

        await User.updateOne({ _id: userFound._id }, { token });
        return res.json({ token: token });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ message: "Server error" });
    }
}

export const uploadProfilePicture = async (req, res) => {
    const { token } = req.body;

    try {
        let user = User.findOne({ token: token });
        if (!user) return res.json({ message: "user not found" });

        user.profilePicture = req.file.fiename;
        await user.save();
        return res.json({ message: "pfp updated" });
    } catch (err) {
        throw err;
    }
}


export const updateUserProfile = async (req, res) => {
    const { token, ...newUserData } = req.body;
    try {

        const user = await User.findOne({ token: token });
        if (!user) res.json({ message: "user does not exist!" });

        const { username, email} = newUserData;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] })
        if (existingUser) {
            if (existingUser || String(existingUser._id) !== String(user._id)) {
                return res.json({ message: "User already exists" });
            }
        }

        Object.assign(user, newUserData);
        console.log("Updating user data:", newUserData);
        await user.save();
        return res.json({ message: "Updated!" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const getUserAndProfile = async (req, res) => {
    try {
        const { token } = req.query;
        // console.log(`token for user is  : ${token}`);
        let user = await User.findOne({ token: token });
        if (!user) res.json({ message: " user does not exist" });

        const userProfile = await Profile.findOne({ userId: user._id }).populate('userId', 'name email username password profilePicture');

        return res.json(userProfile);
    } catch (err) {

    }
}

export const updateProfileData = async (req, res) => {
    const { token, ...newProfileData } = req.body;
    try {
        let userProfile = await User.findOne({ token: token });
        if (!userProfile) return res.json({ message: "user does not exist" });

        const profileToUpdate = await Profile.findOne({ userId: userProfile._id });
        if (!profileToUpdate) return res.status(404).json({ message: "Profile does not exist" });
        Object.assign(profileToUpdate, newProfileData);
        console.log("Updating profile data:", newProfileData);
        await profileToUpdate.save();
        return res.json({ message: "Updated!" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllUserProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().populate('userId', ' name username password email profilePicture');

        return res.json(profiles);

    } catch (err) {
        throw err;
    }
}

export const downloadUserResume = async (req, res) => {

    const user_id = req.query.id;
    const userProfile = await Profile.findOne({ userId: user_id }).populate('userId', 'name username email profilePicture');

    let outputPath = await convertUserDataToPDF(userProfile);
    return res.json({ "message": outputPath })

}


export const sendConnectionRequest = async (req, res) => {
    const { token, connectionId } = req.body;
    try {
        let userProfile = await User.findOne({ token: token });
        if (!userProfile) return res.json({ message: "user does not exist" });

        let connectionUser = await User.findOne({ _id: connectionId });
        if (!connectionUser) return res.json({ message: "user does not exist" });

        let existingRequest = await ConnectionRequest.findOne({
            userId: userProfile._id,
            connectionId: connectionUser._id,
        })

        if (existingRequest) return res.json({ message: "request already sent" });

        const connectionRequest = new ConnectionRequest({
            userId: userProfile._id,
            connectionId: connectionUser._id,
        })

        await connectionRequest.save();
        return res.json({ message: "request  sent" });
    } catch (err) {
        throw err;
    }
}

export const getMyConnectionRequests = async (req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({ token });
        if (!user) res.json({ message: " user does not exist" });

        const connections = await ConnectionRequest.find({ userId: user._id })
            .populate('connectionId', 'name username email profilePicture');

        return res.json(connections);
    } catch (err) {
        throw err;
    }
}


export const myConnectionsRequestsList = async (req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({ token });
        if (!user) res.json({ message: " user does not exist" });

        const connectionsList = await ConnectionRequest.find({ connectionId: user._id })
            .populate('userId', 'name username email profilePicture');

        return res.json(connectionsList);
    } catch (err) {
        throw err;
    }
}


export const acceptConnectionRequest = async (req, res) => {
    const { token, requestId, action_type } = req.body;
    try {
        const user = await User.findOne({ token });
        if (!user) res.json({ message: " user does not exist" });

        const connectionRequest = await ConnectionRequest.findOne({ _id: requestId });
        if (!connectionRequest) {
            return res.status(404).json({ message: "no request exists" });
        }

        if (action_type === "accept") {
            connectionRequest.status_accepted = true;
        } else {
            connectionRequest.status_accepted = false;
        }

        await connectionRequest.save();
        return res.status(200).json({ message: "Connection request updated successfully" }); 
    } catch (err) {
        throw err;
    }
}

export const commentPost = async (req, res) => {
    const { token, post_id, commentBody } = req.body;
    try {
        let user = await User.findOne({ token: token }).select("_id");
        if (!user) res.json({ message: " user does not exist" });

        let post = await Post.findOne({ _id: post_id });
        if (!post) return res.status(404).json({ message: "post does not exist" });

        let comment = new Comment({
            userId: user._id,
            postId: post_id,
            body: commentBody,
        })

        await comment.save();
        return res.status(201).json(comment);
    } catch (err) {
        console.error("Error posting comment: ", err);
        return res.status(500).json({ message: "Internal server error" });
    }

}

export const getUserProfileAndUserBasedOnUsername = async (req, res) => {
    const { username } = req.query;

    try {
        const user = await User.findOne({ username });
        console.log("Requested username:", username);
        if (!user){
             return res.json({ message: " user does not exist" });
        } 

        const userProfile = await Profile.findOne({ userId: user._id }).populate('userId', 'name username email profilePicture');
        return res.json({"profile" : userProfile})
    } catch (err) {
        throw err;
    }
}

