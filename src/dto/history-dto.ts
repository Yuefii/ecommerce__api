/* eslint-disable  @typescript-eslint/no-explicit-any */
export class HistoryDTO {
  public fromGet(result: any) {
    return {
      user_id: result.users?.userId,
      history_id: result.historyId,
      title: result.title,
      category: result.category
    }
  }
}