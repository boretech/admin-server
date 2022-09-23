import { PrismaClient } from '@prisma/client'

let prisma = null

if (process.env.NODE_ENV !== 'production') {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
} else {
  prisma = new PrismaClient()
}

export default prisma