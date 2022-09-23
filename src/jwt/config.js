export const withoutToken = [
  '/api/getToken',
  '/api/test_api'
]

export const secret = 'boretech_server_secret'

export const expiresIn = 7200

export default {
  secret,
  expiresIn,
  withoutToken
}