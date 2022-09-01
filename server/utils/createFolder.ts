import fs from "fs";

export function createFolder(path = "") {
  if (!fs.existsSync(process.cwd() + path)) {
    fs.mkdirSync(process.cwd() + path, { recursive: true });
  }
}
