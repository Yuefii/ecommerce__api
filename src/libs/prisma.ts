// import { logger } from './winston'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query'
    },
    {
      emit: 'event',
      level: 'error'
    },
    {
      emit: 'event',
      level: 'info'
    },
    {
      emit: 'event',
      level: 'warn'
    }
  ]
})

// prisma.$on('error', (e) => {
//   logger.error(e)
// })

// prisma.$on('warn', (e) => {
//   logger.warn(e)
// })

// prisma.$on('info', (e) => {
//   logger.info(e)
// })

// prisma.$on('query', (e) => {
//   logger.info(e)
// })

export default prisma
