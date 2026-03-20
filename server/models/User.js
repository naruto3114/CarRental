import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    role: {type: String,enum:["owner", "user"], default: 'user'},
    image: {type: String, default: ''},

},{timestamps: true})

const User = mongoose.model('User', userSchema)

export default User;