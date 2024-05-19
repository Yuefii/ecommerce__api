import prisma from '../../../libs/prisma'

export const deleteHistoryService = async (historyId: string) => {
  const result = await prisma.history.delete({
    where: {
      historyId: historyId
    }
  })
  return result
}
