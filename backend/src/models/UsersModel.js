import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    username:{
        type : String,
        required : true,
        unique : true,
    },
    email :{
        type : String,
        required : true,
        unique : true,
    },
    active:{
        type: Boolean,
        default : '',
    },
    password:{
        type : String,
        required : true,
    },
    profilePicture:{
        type: String,
        default: 'default.png',
    },
    createdAt:{
        type : Date,
        default: Date.now,
    }, 
    token :{
        type : String,
        default : '',
    }
})

const User= mongoose.model("Post", userSchema);
export default User;