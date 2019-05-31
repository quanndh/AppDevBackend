const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model

const dateModel = new Schema({
    user:{type: Schema.Types.ObjectId, ref: "users", default: null},
    course:{type: Schema.Types.ObjectId, ref: "courses", default: null},
    detail:[new Schema({
        date: {type: Date, default: Date.now},
        info: [{type: String}]
    })]
})

module.exports = model("dates", dateModel)