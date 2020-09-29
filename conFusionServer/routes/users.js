var express = require('express');
const bodyParser = require("body-parser");
var User = require("../models/user");
var passport = require("passport");

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post("/signup", (req, res, next) => {
  //allows sign up
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({err: err});
    }
    else {
      passport.authenticate("local")(req, res, () => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({success: true, status: "Registration Successful!"});
      });
    }
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({success: true, status: "You are successfully logged in!"});
});

router.get("/logout", (req, res, next) => {
  if(req.session) {
    /*information is removed pertaining to the session*/
    req.session.destroy();
    res.clearCookie("session-id");
    /*redirects the user to the main page*/
    res.redirect("/");
  }
  else {
    var err = new Error("You are not logged in!");
    err.status = 403;
    next(err);
  }
});

module.exports = router;