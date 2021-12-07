const http = require("http");
const url = require("url");
const path = require("path");
const config = require("../config/config");
const readStaticFile = require("./readStaticFile.js");
const changeFileName = require("./utils/changeFileName");

const server = http.createServer((request, response) => {
  //新版Api
  const actualURL = `http://${config.host}:${config.port}${request.url}`
  const urlObj = new URL(actualURL)
  const urlPathname = urlObj.pathname;
  const query = urlObj.searchParams
  // 老版Api
  // const urlObj = url.parse(request.url);
  // const urlPathname = urlObj.pathname;
  // const query = urlObj.query
  // 更改文件名， 通过ajax请求
  if (urlPathname.startsWith("/changeFile/")) {
    // changeFileName(request, response, path.dirname(urlPathname), query);
    changeFileName(request, response, urlPathname, query);
  }else{
    const filePathname = path.join(
      config.path,
      //解码一次， 为了支持获取中文文件名
      decodeURIComponent(urlPathname)
    );
    // 读取静态资源
    readStaticFile(request, response, filePathname); 
  }
});

server.listen(config.port, config.host, () => {
  console.log(`监听端口${config.port}`);
});

