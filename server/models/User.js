import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
     profilePic:{
        type:String,
    },
     role:{
        type:String,
        default:"user",
    },
},{timestamps:true});

const UserModel = mongoose.model("user",userSchema);
export default UserModel;