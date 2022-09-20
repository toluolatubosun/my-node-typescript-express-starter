import { Router } from "express";

import { ROLE } from "../config";
import auth from "./../middlewares/auth.middleware";
import AuthCtrl from "./../controllers/auth.controller";

const router = Router();

router.post("/register", AuthCtrl.register);

router.post("/login", AuthCtrl.login);

router.post("/refresh-access-token", AuthCtrl.refreshAccessToken);

router.post("/logout", AuthCtrl.logout);

router.post("/verify-email", AuthCtrl.verifyEmail);

router.post("/request-email-verification", AuthCtrl.requestEmailVerification);

router.post("/reset-password", AuthCtrl.resetPassword);

router.post("/request-password-reset", AuthCtrl.requestPasswordReset);

router.post("/update-password", auth(ROLE.USER), AuthCtrl.updatePassword);

export default router;
