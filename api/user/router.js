const express = require("express");
const Router = express.Router;
const userApiRouter = Router();
const userModel = require("./model");
const bcrypt = require("bcryptjs");
const courseModel = require("../course/model")
//CREATE
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

//READ
//READ ALL
userApiRouter.get("/", (req, res) => {
    userModel.find({})
        .select("-password -__v")
        .then(users => res.status(200).send({success: 1, data: users}))
        .catch(err => res.status(500).send({success: 0, message: err}))
})



//READ ONE
userApiRouter.get("/:id", (req, res) => {
    userModel.findOne({_id : req.params.id})
        .select("-password -__v")
        .then(user => {
            res.status(200).send({success: 1, data: user})
        })
        .catch(err => res.status(500).send({success: 0, message: err}))
})
//READ TRAINER COURSES

userApiRouter.get("/role/:role/", (req, res) => {
    const role = req.params.role    
    if (role === "admin"){
        userModel.find({
            role:{$in:['trainer', 'staff']}
        })
        .then(users => {
            let trainerCount = 0;
            let staffCount = 0;
            for (let i = 0; i < users.length; i++){
                if (users[i].role == 'staff'){
                    staffCount += 1
                }
                else trainerCount += 1
            }
            res.send({staffCount: staffCount, trainerCount: trainerCount})
        })
        .catch(err => console.log(err))
     }
     else if (role === "staff"){
         userModel.find({
             role:{$in:['trainer', 'trainee']}
         })
         .then(users => {
             let trainerCount = 0;
             let traineeCount = 0;
             for (let i = 0; i < users.length; i++){
                 if (users[i].role == 'trainer'){
                     trainerCount += 1
                 }
                 else traineeCount += 1
             }
             res.send({trainerCount: trainerCount, traineeCount: traineeCount})
         })
         .catch(err => console.log(err))
     }
     else if (role === "trainer"){
        courseModel.find({
            trainer: req.query.id
        })
        .select("-__v -trainer")
        .then(courses =>{
            let traineeCount = 0;
            for (let i = 0; i < courses.length; i ++){
                traineeCount += courses[i].trainee.length
            }
            res.send({coursesCount: courses.length, traineeCount: traineeCount, courses: courses})
        })
        .catch(err => res.status(500).send({success: 0, message: err}))
     }
})



//UPDATE PWD + ROLE
userApiRouter.put("/:id", (req, res) => {
    const salt = bcrypt.genSaltSync(12);
    const hashPw = bcrypt.hashSync(req.body.password, salt);
    userModel.update(
        {_id: req.params.id},
        {   
            password: hashPw,
            role: req.body.role
        }
    )
    .then(savedUser => res.status(200).send({success: 1, data: savedUser}))
    .catch(err => res.status(500).send({success: 0, message: err}))
})

//DELETE
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