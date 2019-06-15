const express = require("express");
const app = express();
const bdParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const apiRouter = require("./api/apiRouter");
const session = require("express-session");

mongoose.connect("mongodb+srv://admin:admin@cluster0-dsb6n.mongodb.net/TrainingFPT?retryWrites=true&w=majority",{useNewUrlParser: true, useFindAndModify: false }, err => {
    if(err) console.log(err);
    else console.log("Connected");
})
// mongoose.connect('mongodb://localhost:27017/TrainingFPT', {useNewUrlParser: true}, err => {
//     if (err) console.log(err);
//     else console.log("Connected");
// });

app.use(session({
  secret: "ahihi",
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: false,
  }
}))

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }))


app.use(bdParser.urlencoded({extended:false}))
app.use(bdParser.json());

app.use("/api", apiRouter);
app.listen(process.env.PORT || 6969 , err => {
    if(err) console.log(err);
    else console.log("Server start 6969")
})
    