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
    bcrypt.hash(tempPass, 10).then(async (hash) => {
      let userObj = {
        email: req.body.email,
        password: hash,
        name: req.body.name,
        role: req.body.role,
        enabled: false,
        courseid: req.body.courseid,
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

// view one
// view all
// login
// update
// delete
