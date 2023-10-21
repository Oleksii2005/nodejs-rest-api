import express from "express";
import authController from "../../controllers/auth-controller.js";
import { authenticate, isEmptyBody } from "../../middlewares/index.js";
import validateBody from "../../decorators/validateBody.js";
import {
  userRegisterSchema,
  userLoginSchema,
  updateSubscriptionSchema,
} from "../../models/User.js";

const userSignUpValidate = validateBody(userRegisterSchema);
const userSignInValidate = validateBody(userLoginSchema);
const userUpdateValidate = validateBody(updateSubscriptionSchema);
const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  userSignUpValidate,
  authController.register
);
authRouter.post(
  "/login",
  isEmptyBody,
  userSignInValidate,
  authController.login
);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.logout);
authRouter.patch(
  "/",
  authenticate,
  userUpdateValidate,
  authController.updateSubscription
);
export default authRouter;
