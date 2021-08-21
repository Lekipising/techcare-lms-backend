import express from "express";
import { addUser } from "../controllers/usersController.js";

const usersRouter = express.Router();

usersRouter.post("/", addUser);

export default usersRouter;
