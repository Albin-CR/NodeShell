"use strict";

import User from "../model/userModel";

const userController = {};

userController.register = (req, res) => {
  const { username, password, email, phno } = req.body;

  // NOTE Validation if necessory

  const user = new User({
    username,
    password,
    email,
    phno
  });

  user
    .save()
    .then(newUser => {
      res.status(200).json({
        success: true,
        data: newUser,
        albin: "ok"
      });
    })
    .catch(error => {
      if (error.code == 11000) {
        return res.status(500).json({
          message: "Email already exists"
        });
      } else {
        return res.status(500).json({
          message: error,
          albin: "failed"
        });
      }
    });
};

userController.login = (req, res) => {
  const { username, password } = req.body;
  console.log(req.body,req.body.username);
  User.findOne({ username: username }, function(err, obj) {
    if (obj != null && obj.password == password) {
      req.session.username = req.body.username;

      return res.status(200).json({
        success: "logged in successfully"
      });
    } else {
      return res.status(200).json({
        error: "User dose not exist"
      });
    }
  });
};

userController.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err, "no logout");
    } else {
      console.log(err, "logout");
      res.redirect("/");
    }
  });
};

export default userController;
