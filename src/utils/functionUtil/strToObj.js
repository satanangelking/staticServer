module.exports=(data='')=>{
  data = data.split('&')
  const obj = {}
  data.forEach(item=>{
    item = item.split('=')
    obj[item[0]] = decodeURIComponent(item[1])
  })
  return obj
}