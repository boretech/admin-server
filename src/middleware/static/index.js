import { join, resolve } from 'path'
import { stat, readFileSync } from 'fs'

const mine = JSON.parse(readFileSync(resolve(process.cwd(), './src/middleware/static/mine.json'), 'utf-8'))

export const getStatic = (url, dir) => async (ctx, next) => {
  const { path } = ctx.request
  let exName = path.split('.')[1]
  if (exName || path === '/') {
    let filePath = ''
    if (exName) {
      filePath = join(dir, path.substring(url.length))
    } else {
      exName = 'html'
      filePath = join(dir, 'index.html')
    }
    let fileExists = false
    try {
      stat(filePath, () => {

      })
      fileExists = true
    } catch (e) {
      console.error(e)
      fileExists = false
    }

    let type = mine[exName]

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

export default getStatic