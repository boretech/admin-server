import sign from 'jsonwebtoken/sign.js'
import { secret } from './config.js'

export const genToken = (userInfo) => {
  const token = sign(userInfo, secret, { expiresIn: 7200 })
  return token
}
