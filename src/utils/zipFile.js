const zlib = require("zlib");
const config = require('../../config/config')
// 浏览器支持的压缩方式
module.exports = (readStream, request, response) => {
  const acceptEncoding = request.headers["accept-encoding"];
  if (!acceptEncoding || !acceptEncoding.match(config.zip)) {
    return readStream;
  } else if (acceptEncoding.match(/\bgzip\b/)) {
    response.setHeader("Content-Encoding", "gzip");
    return readStream.pipe(zlib.createGzip());
  } else if (acceptEncoding.match(/\bdeflate\b/)) {
    response.setHeader("Content-Encoding", "deflate");
    return readStream.pipe(zlib.createDeflate());
  }
};
