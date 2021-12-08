const path = require("path");
const config = require("../../config/config");
const fs = require("fs");

const queryString = require("./functionUtil/strToObj");

module.exports = (request, response, urlPathname, query) => {
  urlPathname = urlPathname.replace("/changeFile/", "/");
  // 老版api, 需将字符串转为对象
  const Obj = queryString(query);
  const filePathname = path.join(
    config.path,
    //解码一次， 为了支持获取中文文件名
    decodeURIComponent(urlPathname)
  );
  fs.readFile(filePathname, (req, res) => {
    try {
      fs.rename(
        // 老版api
        filePathname + "/" + Obj.old,
        filePathname + "/" + Obj.new,
        // 新版api
        // filePathname + "/" + query.get('old'),
        // filePathname + "/" + query.get('new'),
        (err) => {
          console.log(err);
          if (!err) {
            console.log("成功");
          }
        }
      );
      response.end();
    } catch (e) {
      console.log(err);
      response.writeHead(404, { "Content-Type": contentTypeMime });
      response.write("404 Not Found");
      response.end();
    }
  });
};
