import path from "path";
import sharp from "sharp";
import fs from "fs";

const options = {
  avatar: {
    width: 200,
    height: 200,
  },
};

export const cropMiddleware = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const imageUrl = req.file.path;
  const folder = req.file.destination;
  const imageName = req.file.filename.split(".")[0];
  const imageFormat = path.extname(req.file.filename);
  const arrPromise = [];
  Object.keys(options).forEach((option) => {
    const outputImage = folder + "/" + imageName + `-${option}` + imageFormat;
    arrPromise.push(
      sharp(imageUrl)
        .resize(options[option].width, options[option].height)
        .toFile(outputImage)
    );
  });

  Promise.all(arrPromise)
    .then(() => {
      fs.unlinkSync(imageUrl);
    })
    .then(() => {
      next();
    })
    .catch((error) => {
      next(error);
    });
};
