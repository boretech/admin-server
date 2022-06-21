import { join } from 'path'
import mine from './mine.json' assert {type: 'json'}
import { stat, readFileSync } from 'fs'

export const getStatic = (url, dir) => async (ctx, next) => {
  const { path } = ctx.request
  console.log(url)
  console.log(dir)
  console.log(path)
  if (path.startsWith(url)) {
    const filePath = join(dir, path.substring(url.length))
    let fileExists = false
    try {
      stat(filePath)
      fileExists = true
    } catch (e) {
      console.error(e)
      fileExists = false
    }

    let type = ''

    for (let key in mine) {
      for (let value of mine[key]) {
        if (filePath.endsWith(value)) {
          type = `${key}/${value}`
        }
      }
    }

    if (fileExists) {
      ctx.response.type = type ? type : 'text/plain'
      ctx.response.body = readFileSync(filePath)
    } else {
      ctx.response.status = 404
    }
  } else {
    await next()
  }
}
