const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;


const userModel = new Schema({
    name: {type: String, require: true, unique: true},
    role: {type: String, require: true, enum: ["admin","staff","trainer", "trainee"]}, 
    password: {type: String, require: true}
})

module.exports = model("users", userModel);