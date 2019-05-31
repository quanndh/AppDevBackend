const express = require("express");
const Router = express.Router;
const dateApiRouter = Router();
const dateModel = require("./model");

//CRUD
//READ
//READ ALL
dateApiRouter.get('/all', (req, res)=> {
    dateModel.find({})
    .then(dates=> res.status(200).send({success: 1, data: dates}))
    .catch(err => res.status(500).send({success: 0, message: err}))
})

//READ BY DATE ID
dateApiRouter.get('/:id', (req, res) => {
    dateModel.findOne({_id: req.params.id})
    .then(date => res.status(200).send({success: 1, data: date}))
    .catch(err => res.status(500).send({success: 0, message: err}))
})

//CREATE
dateApiRouter.post("/", (req, res) => {
    const {course, user} = req.query
    dateApiRouter.findOne({
        course: course, user: user
    })
    .populate('users')
})

module.exports = dateApiRouter;