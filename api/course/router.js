const express = require("express");
const Router = express.Router;
const courseApiRouter = Router();
const courseModel = require("./model");
const userModel = require("./model");
//CREATE
courseApiRouter.post("/", (req, res) => {
    const {name, topic} = req.body;
    let found = false;
    courseModel.find({name: name})
    .then(() => found = true)
    .catch(err => console.log(err))

    if(found){
        res.status(401).send({success: 0, message: "Name is taken"})
    } else {
        courseModel.create({name, topic })
            .then(createdCourse => res.status(200).send({success: 1, data: createdCourse}))
            .catch(err => res.status(500).send({success: 0, message: err}))
    }
})
//READ
//READ ALL
courseApiRouter.get("/", (req, res) => {
    courseModel.find({})
        .then(courses => res.status(200).send({success: 1, data: courses}))
        .catch(err => res.status(500).send({success: 0, message: err}))
})

//READ BY ID
courseApiRouter.get("/:id", (req, res) => {
    courseModel.findOne({_id : req.params.id})
        .then(course => res.status(200).send({success: 1, data: course}))
        .catch(err => res.status(500).send({success: 0, message: err}))

})

//UPDATE
//Add more trainee
courseApiRouter.put("/:id", (req, res) => {
    courseModel.findOne({_id : req.params.id})
    .then(course => {
        let trainees = course.trainee;
        trainees.push(req.body.trainee)
        courseModel.update(
            {_id: req.params.id},
            {   
                name: req.body.name,
                topic: req.body.topic,
                trainer: req.body.trainer,
                trainee: trainees
            })
            .then(()=> res.status(200).send({success: 1}))
    })
    .catch(err => res.status(500).send({success: 0, message: err}))
})

courseApiRouter.delete("/:id", (req, res) => {
    courseModel.deleteOne({_id: req.params.id})
    .then(() => {
        res.status(200).send({success: 1})
    })
    .catch((err) => {
        res.status(500).send({success: 0})
    })
})


module.exports = courseApiRouter;