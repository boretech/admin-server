import sign from 'jsonwebtoken/sign.js'
import { secret, expiresIn } from './config.js'

export const genToken = (userInfo) => {
  const token = sign(userInfo, secret, { expiresIn })
  return token
}
