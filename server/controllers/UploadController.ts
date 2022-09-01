import path from "path";
import express from "express";

class UploadController {
  async uploader(req: express.Request, res: express.Response) {
    const { filename } = req.file;
    const avatar = filename.split(".")[0];
    res.json({
      url: `/avatars/${avatar}-avatar${path.extname(filename)}`,
    });
  }
}

export default new UploadController();
