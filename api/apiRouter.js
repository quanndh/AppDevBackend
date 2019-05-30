const express = require("express");
const Router = express.Router;

const apiRouter = Router();

const userApiRouter = require("./user/router");
const authApiRouter = require("./auth/router");
const courseApiRouter = require("./course/router");

apiRouter.get("/", (req, res) => {
    res.send("hello");
})


apiRouter.use("/users", userApiRouter);

apiRouter.use("/auth", authApiRouter);

apiRouter.use("/courses", courseApiRouter);

// apiRouter.use((req, res, next) => {
//     if(req.session.user){
//         next();
//     } else {
//         res.status(401).send({success: 0, message: "Ban chua dang nhap"})
//     }
// })

module.exports = apiRouter;