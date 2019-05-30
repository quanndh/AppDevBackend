const express = require("express");
const Router = express.Router;
const courseApiRouter = Router();
const courseModel = require("./model");
const bcrypt = require("bcryptjs");

courseApiRouter.post("/", (req, res) => {
    const {name, role, password} = req.body;

    let found = false;
    courseModel.find({name: name})
    .then(() => found = true)
    .catch(err => console.log(err))

    if(found){
        res.status(401).send({success: 0, message: "Name is taken"})
    } else {
        const salt = bcrypt.genSaltSync(12);
        const hashPw = bcrypt.hashSync(password, salt);

        courseModel.create({name, password: hashPw, role})
            .then(createdUser => res.status(200).send("created" + createdUser))
            .catch(err => res.status(500).send({success: 0, message: err}))
    }
})

courseApiRouter.get("/", (req, res) => {
    courseModel.find({})
        .then(users => res.status(200).send({success: 1, data: users}))
        .catch(err => res.status(500).send({success: 0, message: err}))
})

courseApiRouter.get("/:id", (req, res) => {
    courseModel.findOne({_id : req.params.id})
        .then(user => res.status(200).send({success: 1, data: user}))
        .catch(err => res.status(500).send({success: 0, message: err}))

})

courseApiRouter.put("/:id", (req, res) => {
    const salt = bcrypt.genSaltSync(12);
    const hashPw = bcrypt.hashSync(req.body.password, salt);
    courseModel.update(
        {_id: req.params.id},
        {   
            password: hashPw,
            role: req.body.role,
            course: req.body.course
        }
    )
    .then(savedUser => res.status(200).send({success: 1, data: savedUser}))
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