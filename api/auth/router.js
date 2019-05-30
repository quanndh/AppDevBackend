const express = require("express");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const authRouter = Router;

const userModel = require("../user/model");

authRouter.post("/", (req, res) => {
    const {name, password} = req.body;
    if(!name || !password){
        res.status(400).send({success: 0, message: "Thiếu name hoặc password"});
    } else {
        userModel.findOne({name})
        .then(userFound => {
            if(!userFound || !userFound._id){
                res.status(404).send({success: 0, message: "Nguoi dung khong ton tai"});
            } else {
                if(bcrypt.compareSync(password, userFound.password)){
                    let user = {
                        name: userFound.name,
                        id: userFound._id,
                    }
                    req.session.user = user;
                    
                    res.send({success: 1});
                    // res.redirect("http://localhost:3000/");
                } else {
                    res.status(401).send({success: 0, message: "Wrong name or password"});
                }
            }
        })
        .catch(err => {
            res.status(500).send({success: 0, message: err});
        })
    }
})

authRouter.get("/me", (req, res) => {
    if(!req.session.user){
        res.status(403).send({success: 0, message: ' unauthozied'})
    } else {
        userModel.findById(req.session.user.id, "-password")
        .then(userFound => {
            res.send({success: 1, message: userFound});
        })
        .catch(err => {
            res.status(500).send({success: 0, message: err});
        })
    }
})

authRouter.delete("/", (req, res) => {
    req.session.destroy();
    res.send("loged out");
})
module.exports = authRouter;