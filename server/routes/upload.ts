import express from "express";
import { uploader } from "../configs/multer";
const router = express.Router();
import { cropMiddleware } from "../configs/crop";
import UploadController from "../controllers/UploadController";

router.post(
  "/",
  [uploader.single("avatar"), cropMiddleware],
  UploadController.uploader
);

export default router;
