import express from "express";
import authController from "../../controllers/auth-controller.js";
import { authenticate, isEmptyBody, upload } from "../../middlewares/index.js";
import validateBody from "../../decorators/validateBody.js";
import {
  userRegisterSchema,
  userLoginSchema,
  updateSubscriptionSchema,
  userEmailSchema,
} from "../../models/User.js";

const userSignUpValidate = validateBody(userRegisterSchema);
const userSignInValidate = validateBody(userLoginSchema);
const userUpdateValidate = validateBody(updateSubscriptionSchema);
const userEmailValidate = validateBody(userEmailSchema);
const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  isEmptyBody,
  userSignUpValidate,
  authController.register
);
authRouter.get("/verify/:verificationToken", authController.verify);
authRouter.post("/verify", userEmailValidate, authController.resendVerifyEmail);

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
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatarUser
);

export default authRouter;
