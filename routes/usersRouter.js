import express from "express";
import { addUser, activateUser } from "../controllers/usersController.js";

const usersRouter = express.Router();

usersRouter.post("/", addUser);
usersRouter.post("/activate", activateUser);

export default usersRouter;
//83xpxgiit3f