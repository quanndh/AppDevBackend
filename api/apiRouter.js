const express = require("express");
const Router = express.Router;

const apiRouter = Router();

const userApiRouter = require("./user/router");
const authApiRouter = require("./auth/router");
const courseApiRouter = require("./course/router");
const dateApiRouter = require("./workdate/router")

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

apiRouter.use("dates", dateApiRouter);



module.exports = apiRouter;