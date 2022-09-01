import express from "express";
const router = express.Router();
import { passport } from "../configs/passport";
import AuthController from "../controllers/AuthController";

//Google auth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  AuthController.googleCb
);

//Github auth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/", session: false }),
  AuthController.githubCb
);

router.post("/manually", AuthController.registration);
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  AuthController.getMe
);

router.post(
  "/phone",
  passport.authenticate("jwt", { session: false }),
  AuthController.setPhone
);

router.get(
  "/activate/:id",
  passport.authenticate("jwt", { session: false }),
  AuthController.activate
);

export default router;
