const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;


const courseModel = new Schema({
    name: {type: String, require: true, unique: true},
    topic: {type: String, require: true, enum: ["AI", "Machine learning", "Robotics"]}, 
    trainer: {type: Schema.Types.ObjectId, ref: "users", default: ""},
    trainee: [{type: Schema.Types.ObjectId, ref: "users", default: []}]
})

module.exports = model("courses", courseModel);