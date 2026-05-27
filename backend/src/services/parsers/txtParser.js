import fs from "fs";

export const parseTXT = (filePath) => {
  return fs.readFileSync(filePath, "utf-8");
};