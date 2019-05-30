const express = require("express");
const Router = express.Router;
const userApiRouter = Router();
const userModel = require("./model");
const bcrypt = require("bcryptjs");

userApiRouter.post("/", (req, res) => {
    const {name, role, password} = req.body;

    let found = false;
    userModel.find({name: name})
    .then(() => found = true)
    .catch(err => console.log(err))

    if(found){
        res.status(401).send({success: 0, message: "Name is taken"})
    } else {
        const salt = bcrypt.genSaltSync(12);
        const hashPw = bcrypt.hashSync(password, salt);

        userModel.create({name, password: hashPw, role})
            .then(createdUser => res.status(200).send({success: 1, data: createdUser}))
            .catch(err => res.status(500).send({success: 0, message: err}))
    }
})

userApiRouter.get("/", (req, res) => {
    userModel.find({})
        .then(users => res.status(200).send({success: 1, data: users}))
        .catch(err => res.status(500).send({success: 0, message: err}))
})

userApiRouter.get("/:id", (req, res) => {
    userModel.findOne({_id : req.params.id})
        .then(user => res.status(200).send({success: 1, data: user}))
        .catch(err => res.status(500).send({success: 0, message: err}))

})

userApiRouter.put("/:id", (req, res) => {
    const salt = bcrypt.genSaltSync(12);
    const hashPw = bcrypt.hashSync(req.body.password, salt);
    userModel.update(
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

userApiRouter.delete("/:id", (req, res) => {
    userModel.deleteOne({_id: req.params.id})
    .then(() => {
        res.status(200).send({success: 1})
    })
    .catch((err) => {
        res.status(500).send({success: 0})
    })
})


module.exports = userApiRouter;