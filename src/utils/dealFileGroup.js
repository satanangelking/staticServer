const fs = require("fs");
const path = require("path");
const config = require("../../config/config");
// 模板引入
const ejs = require("ejs");
const tplPath = path.join(__dirname, '../','views/index.ejs')
// const tplPath = path.join(config.path, 'src/views/x.html') 
// 为Buffer格式， 需转化toString
const source = fs.readFileSync(tplPath);
module.exports = (filePath, response, contentTypeMime) => {
  fs.readdir(filePath, (err, files) => {
    try{
      response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      const dir = path.relative(
        config.path,
        decodeURIComponent(filePath)
      );
      // dirname（当前路径下的父级路径）
      const dirfather = path.dirname(dir)=='.' ? '/' : '/'+path.dirname(dir)
      const data = {
        files,
        dir: dir ? `${dir}` : "",
        dirfather: dirfather 
      };
      const template = ejs.render(source.toString(), data);
      response.end(template);
    }catch(err){
      console.log(err)
      response.writeHead(404, { "Content-Type": contentTypeMime });
      response.end(`${filePath} is not a fileGroup`);
    }
  });
};
