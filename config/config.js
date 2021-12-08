const config = {
  path: decodeURIComponent(process.cwd()), // 获取根路径， 解码为了获取正确中文地址
  // path: '/Users/',
  // host: '127.0.0.1',
  // port: '3003',
  host: '0.0.0.0',
  port: '80',
  zip: /\b(gzip|deflate)\b/, //匹配压缩请求头
  types:{
    ".css": "text/css",
    ".gif": "image/gif",
    ".html": "text/html",
    ".ico": "image/x-icon",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".js": "text/javascript",
    ".json": "application/json",
    ".pdf": "application/pdf",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".swf": "application/x-shockwave-flash",
    ".tiff": "image/tiff",
    ".txt": "text/plain",
    ".wav": "audio/x-wav",
    ".wma": "audio/x-ms-wma",
    ".wmv": "video/x-ms-wmv",
    ".xml": "text/xml"
  },
  // 缓存配置， true为开启。
  cache: {
    maxAge: 5, // 单位秒
    expires: true,
    cacheControl: true,
    lastModified: true,
    etag: true
  }
}
module.exports = config