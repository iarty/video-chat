import multer from "multer";
import path from "path";
import nanoid from "nanoid";
const uploadPath = path.join(__dirname, "public");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, uploadPath + "/avatars/");
  },
  filename: (req, file, cb) => {
    const fileName = nanoid(10);

    return cb(null, fileName + path.extname(file.originalname));
  },
});

const uploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      return cb(null, false);
    }
    cb(null, true);
  },
});

export { uploader };
