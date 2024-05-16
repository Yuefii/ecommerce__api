import { baseUrl } from '../utils/env'

/* eslint-disable  @typescript-eslint/no-explicit-any */
export class HistoryDTO {
  public fromGet(result: any) {
    return {
      user_id: result.users?.userId,
      history_id: result.historyId,
      title: result.title,
      category: result.category,
      user: {
        user_history_id: result.users?.userId,
        name: result.users?.name,
        avatar: baseUrl + 'public/user/' + result.Users.imageUrl,
        email: result.users?.email
      }
    }
  }
}
