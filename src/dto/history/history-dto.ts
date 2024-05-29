import { History } from '@prisma/client'

export type HistoryResponse = {
  user_id?: string | null
  history_id?: string | null
  title?: string | null
  category?: string | null
}

export type CreateHistoryRequest = {
  title: string
  category: string
}

export function toHistoryResponse(history: History): HistoryResponse {
  return {
    user_id: history.userId,
    history_id: history.historyId,
    title: history.title,
    category: history.category
  }
}
