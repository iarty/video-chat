import express from "express";
import { uploader } from "../multer";
const router = express.Router();
import { cropMiddleware } from "../configs/crop";
import path from "path";

router.post(
  "/",
  [uploader.single("avatar"), cropMiddleware],
  async (req, res) => {
    const { filename } = req.file;
    const avatar = filename.split(".")[0];
    res.json({
      url: `/avatars/${avatar}-avatar${path.extname(filename)}`,
    });
  }
);

export default router;
