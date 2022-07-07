import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const disconnect = async () => {
  await prisma.$disconnect()
}

export const db = async (fn) => {
  return await fn()
}