import fs from "fs";

export function createFolder(path = "") {
  if (!fs.existsSync(__dirname + path)) {
    fs.mkdirSync(__dirname + path, { recursive: true });
  }
}
