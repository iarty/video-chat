import express from "express";
const router = express.Router();
import UserController from "../controllers/UserController";
import { passport } from "../configs/passport";

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  UserController.getUserById
);

export default router;
