import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Users from "../modals/users.js";

dotenv.config();

// create account - done by admin
export async function addUser(req, res) {
  try {
    let userExists = await Users.findAll({ where: { email: req.body.email } });
    if (userExists.length != 0) {
      return res.status(200).json({
        success: false,
        message: "Email in use already",
      });
    }
    let tempPass = Math.random().toString(36).slice(2);
    console.log(tempPass);
    bcrypt.hash(tempPass, 10).then(async (hash) => {
      let userObj = {
        email: req.body.email,
        password: hash,
        name: req.body.name,
        role: req.body.role,
        enabled: false,
        courseid: req.body.courseid,
        avatar: req.body.avatar,
      };
      let user = await Users.create(userObj);
      if (user) {
        // send creds via email
        res.status(200).json({
          success: true,
          message: "User created successfully",
          data: user,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "User could not be created at this time",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something is not working right ...",
    });
  }
}
// activate - first time
export async function activateUser(req, res) {
  try {
    // check if user exist
    let userExists = await Users.findAll({ where: { email: req.body.email } });
    if (userExists.length == 0) {
      return res.status(200).json({
        success: false,
        message: "User does not exist",
      });
    }
    // check if not enabled
    if (userExists[0].enabled == "1" || userExists[0].enabled == true) {
      return res.status(200).json({
        success: false,
        message: "User already activated",
      });
    }
    // check if predetermined password is correct
    bcrypt
      .compare(req.body.oldpassword, userExists[0].password)
      .then((response) => {
        if (!response) {
          return res.status(401).json({
            status: false,
            message: "Incorrect old password",
          });
        } else {
          // save new pass and activate
          bcrypt.hash(req.body.password, 10).then(async (hash) => {
            let updatedUser = {
              enabled: true,
              password: hash,
            };
            let user = await Users.update(updatedUser, {
              where: { email: req.body.email },
            });
            if (user) {
              res.status(200).json({
                success: true,
                message: "User account activated!",
                data: user,
              });
            } else {
              res.status(200).json({
                success: false,
                message: "User account could not be updated at this time",
              });
            }
          });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something is not working right ...",
    });
  }
}
// view one
// view all
// login
// update
// delete
