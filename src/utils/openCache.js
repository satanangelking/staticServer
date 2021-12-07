const config = require('../../config/config')
const crypto = require('crypto')
module.exports = (stats,requst,response)=>{
  refresh(stats,response)
  const lastModified = requst.headers['if-modified-since']
  const etag = requst.headers['if-none-match']
  if(etag && etag === response.getHeader('ETag')){
    return true
  }
  if(lastModified&& lastModified === response.getHeader('Last-Modified')){
    return true
  }
  return false
}

function refresh(stats, response){
  const {maxAge,expires,cacheControl,lastModified,etag} = config.cache
  if(expires){
    response.setHeader('Expires', (new Date(Date.now() + maxAge * 1000).toUTCString()))
  }
  if(cacheControl){
    response.setHeader('Cache-Control', `public, max-age=${maxAge}`)
  }
  if(lastModified){
    response.setHeader('Last-Modified',stats.mtime.toUTCString())
  }
  if(etag){
    response.setHeader('ETag', crypto.createHash('md5').update(`${stats.size}-${stats.mtime.toUTCString()}`).digest('base64'))
  }
}