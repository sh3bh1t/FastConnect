import User from "../models/UsersModel.js";
import bcrypt from 'bcrypt';
import Profile from "../models/ProfilesModel.js";
import crypto from "crypto";
import PDFDocument from 'pdfkit';


const convertUserDataToPDF = (userData)=>{
    const doc = new PDFDocument();

    const outputPath = crypto.randomBytes(32).toString("hex")+ ".pdf";
    
}


export const register = async (req, res) => {

    try {
        let { name, email, username ,password} = req.body;
        
        let userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message : "user already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            name : name, 
            username : username,
            password: hashedPassword,
            email : email,
        })

        await newUser.save();
        const profile = new Profile({userId : newUser._id});
        await profile.save();
        return res.json({message : "user created !"});
    } catch (err) {
        throw err;
    }
}


export const login = async (req,res)=>{
    try{
        let {username, password}= req.body;

        let userFound =await User.findOne({username});
        if(!userFound) res.json({message : " User does not exist"});

        let isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch) res.json({message :"invalid credentials"});

        const token = crypto.randomBytes(32).toString("hex");

        await User.updateOne({ _id : User._id},{token});
        return res.json({token});
    }catch(err){

    }
}

export const uploadProfilePicture= async(req,res)=>{
    const {token}= req.body;

    try{
        let user = User.findOne({token:token});
        if(!user) return res.json({message:"user not found"});

        user.profilePicture= req.file.fiename; 
        await user.save();
        return res.json({message : "pfp updated"});
    }catch(err){
        throw err;
    }
}


export const updateUserProfile = async(req,res)=>{
    try{
        const {token, ...newUserData} = req.body; 

        const user = await User.findOne({ token:token});
        if(!user)  res.json({message:"user does not exist!"});

        const {username, email}= newUserData;

        const existingUser = await User.findOne({ $or : [{username},{email}]})
        if (existingUser){
            if(existingUser || String(existingUser._id)!== String(user._id)){
                return res.json({message:"User already exists"});
            }
        }

        Object.assign(user,newUserData);
        await user.save();
        return res.json({message:"Updated!"});
    }catch(err){
        throw err;
    }
}


export const getUserAndProfile = async(req,res)=>{
    try{
        const {token}= req.body;
        let user= await User.findOne({token : token});
        if(!user) res.json({message : " user does not exist"});

        const userProfile= await Profile.findOne({userId : user._id}).populate('userId','name email username password profilePicture');

        return res.json(userProfile);
    }catch(err){

    }
}

export const updateProfileData = async (req,res)=>{
    try{
        const {token,...newProfileData}= req.body;
        let userProfile = await User.findOne({token:token});
        if(!userProfile) return res.json({message : "user does not exist"});

        const profileToUpdate = await Profile.findOne({userId : userProfile._id});
        Object.assign(profileToUpdate,newProfileData);
        await profileToUpdate.save();
        return res.json({message:"Updated!"});
    }catch(err){
        throw err;
    }
}

export const getAllUserProfiles = async(req,res)=>{
    try{
        const profiles = await Profile.find().populate('userId', ' name username password profilePicture');

        return res.json(profiles);

    }catch(err){
        throw err;
    }
}

export const downloadUserResume = async(req,res)=>{

    const user_id= req.query.id;
    const userProfile = await Profile.findOne({userId : user_id}).populate('userId', 'name username email profilePicture');

    let a = await convertUserDataToPDF(userProfile);
    return res.json({"message": a})
   
}
