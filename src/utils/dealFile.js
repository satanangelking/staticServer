const fs = require("fs");
const openCache = require("./openCache");
const zipFile = require('./zipFile')
// 
module.exports = (filePath, response, request, contentTypeMime, stats) => {
  fs.readFile(filePath, (err, data) => {
    try{
      // 缓存
      if (openCache(stats, request, response)) {
        response.writeHead(304,{ "Content-Type": contentTypeMime });
        response.end();
        return;
      }
      // 开启压缩
      let readStream = fs.createReadStream(filePath);
      readStream = zipFile(readStream, request, response);
      response.writeHead(200, { "Content-Type": contentTypeMime });
      readStream.pipe(response);
    }catch(err){
      console.log(err)
      response.writeHead(404, { "Content-Type": contentTypeMime });
      response.write("404 Not Found");
      response.end();
    }
  });
};
