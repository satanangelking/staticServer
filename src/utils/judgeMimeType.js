const path = require("path");
const mimeList = require("../../config/config").types;

//匹配为文件后缀的资源， 查询不到默认txt。
function getMine(filePath) {
  let suffix = path.extname(filePath).toLowerCase();
  if (!suffix) {
    suffix = filePath;
  }
  return mimeList[suffix] || mimeList["txt"];
}

module.exports = getMine;
