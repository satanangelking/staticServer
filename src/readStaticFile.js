const path = require("path");
const fs = require("fs");
// 匹配文件类型
const getMine = require("./utils/judgeMimeType");
// 文件夹处理， 文件处理
const dealFileGroup = require("./utils/dealFileGroup");
const dealFile = require("./utils/dealFile");

function readStaticFile(request, response, filePath) {
  // 获取静态资源文件后缀名， 不存在后缀名则默认后缀为txt , + charset解码中文避免乱码
  const contentTypeMime = getMine(filePath)+';charset=utf-8';
  // fs.statefs.readDir均可能报错，因此用try-catch
  fs.stat(filePath, (err, stats) => {
    try {
      if (stats.isDirectory()) {
        // 文件夹
        dealFileGroup(filePath, response, contentTypeMime);
      } else if (stats.isFile()) {
        // 文件
        dealFile(filePath, response, request, contentTypeMime, stats);
      }
    } catch (err) {
      console.log(err)
      response.writeHead(404, { "Content-Type": "text/plain;charset=utf-8"});
      response.end(`${filePath} Not Found`);
    }
  });
}

module.exports = readStaticFile;
