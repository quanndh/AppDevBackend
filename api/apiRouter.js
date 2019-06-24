const express = require("express");
const Router = express.Router;

const apiRouter = Router();

const userApiRouter = require("./Controller/userController");
const authApiRouter = require("./Controller/authController");
const courseApiRouter = require("./Controller/courseController");

apiRouter.get("/", (req, res) => {
    res.send("hello");
})




apiRouter.use("/auth", authApiRouter);



apiRouter.use((req, res, next) => {
    if(req.session.user){
        next();
    } else {
        res.status(401).send({success: 0, message: "Ban chua dang nhap"})
    }
})

apiRouter.use("/users", userApiRouter);
apiRouter.use("/courses", courseApiRouter);




module.exports = apiRouter;