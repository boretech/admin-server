import { readdirSync } from 'fs'
import { resolve } from 'path'
import Router from '@koa/router'
import { platform } from 'os'

const router = new Router()

const addMapping = (router, mapping) => {
  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      const path = url.substring(4)
      router.get(path, mapping[url])
      console.log(`register URL mapping: GET ${path}`)
    } else if (url.startsWith('POST ')) {
      const path = url.substring(5)
      router.post(path, mapping[url])
      console.log(`register URL mapping: POST ${path}`)
    } else if (url.startsWith('PUT ')) {
      const path = url.substring(4)
      router.put(path, mapping[url])
      console.log(`register URL mapping: PUT ${path}`)
    } else if (url.startsWith('DELETE ')) {
      const path = url.substring(7)
      router.delete(path, mapping[url])
      console.log(`register URL mapping: DELETE ${path}`)
    } else {
      console.log(`invalid URL: ${url}`)
    }
  }
}

const addControllers = (router, dir) => {
  readdirSync(resolve(process.cwd(), dir))
    .filter(file => file.endsWith('.js'))
    .forEach(async file => {
      console.log(`Process controller: ${file}...`)
      const mapping = await import(`${platform() === 'win32' ? 'file://' : ''}${process.cwd()}/${dir}/${file}`)
      addMapping(router, mapping.default)
    })
}

export const controller = (dir) => {
  const modules = dir || 'src/controller/modules'
  addControllers(router, modules)
  return router.routes()
}

export default controller