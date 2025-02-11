import express from "express";
import * as controller from "./../Controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/registration").post(controller.userRegistration);
userRouter.route("/login").post(controller.userLogin);

export default userRouter;
