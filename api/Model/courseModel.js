const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;


const courseModel = new Schema({
    name: {type: String, require: true, unique: true},
    topic: {type: String, require: true}, 
    trainer: {type: Schema.Types.ObjectId, ref: "users", default: null},
    trainee: [{type: Schema.Types.ObjectId, ref: "users", default: []}],
    calendar:[new Schema({
        date: {type: Date, default: Date.now},
        info: [{type: String, default: []}]
    })]
})

module.exports = model("courses", courseModel);