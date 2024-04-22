export function HistoryDTO(result: any) {
    return {
        user_id: result.users?.userId,
        history_id: result.historyId,
        title: result.title,
        category: result.category,
        user: {
            user_history_id: result.users?.userId,
            name: result.users?.nama,
            email: result.users?.email
        }
    };
}