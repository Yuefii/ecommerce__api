export function DiscusDTO(result: any) {
    return {
        discus_id: result.discusId,
        user_id: result.userId,
        discus_message: result.message,
        discus_type: Array.isArray(result.discusType) ?
            result.discusType.map((item: any) => ({
                name: item.name
            })) : [],
        discus_reply: Array.isArray(result.reply) ?
            result.reply.map((item: any) => ({
                discus_id: item.discusId,
                reply_id: item.replyId,
                user_id: item.userId,
                reply_message: item.message,
                created_at: item.createdAt
            })) : [],
        created_at: result.createdAt
    }
}