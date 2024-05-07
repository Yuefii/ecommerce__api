/* eslint-disable  @typescript-eslint/no-explicit-any */

interface discusTypeInterface {
  name: string
}

interface replyInterface {
  replyId?: string
  discusId?: string | null
  userId?: string | null
  Users: any
  name?: string
  message?: string
  createdAt?: Date
}

interface FromGetType {
  discusId: string
  userId?: string | null
  message: string
  Users: any
  discusType: discusTypeInterface[]
  reply?: replyInterface[]
  createdAt: Date
}

interface FromCreateType {
  discusId: string
  userId?: string | null
  message: string
  Users: any
  discusType: discusTypeInterface[]
  createdAt: Date
}

interface FromReplyType {
  replyId: string
  discusId?: string | null
  userId?: string | null
  Users: any
  message: string
  createdAt: Date
}

export class DiscusDTO {
  constructor() {}

  public fromGet(result: FromGetType) {
    return {
      discus_id: result.discusId,
      user_id: result.userId,
      discus_message: result.message,
      name: result.Users.nama,
      discus_type: Array.isArray(result.discusType)
        ? result.discusType.map((item) => ({
            name: item.name
          }))
        : [],
      discus_reply: Array.isArray(result.reply)
        ? result.reply.map((item) => ({
            discus_id: item.discusId,
            reply_id: item.replyId,
            user_id: item.userId,
            name: item.Users.nama,
            reply_message: item.message,
            created_at: item.createdAt
          }))
        : [],
      created_at: result.createdAt
    }
  }

  public fromCreate(result: FromCreateType) {
    return {
      discus_id: result.discusId,
      user_id: result.userId,
      name: result.Users.nama,
      discus_message: result.message,
      discus_type: Array.isArray(result.discusType)
        ? result.discusType.map((item) => ({
            name: item.name
          }))
        : [],
      created_at: result.createdAt
    }
  }

  public fromReply(result: FromReplyType) {
    return {
      reply_id: result.replyId,
      discus_id: result.discusId,
      user_id: result.userId,
      name: result.Users.nama,
      reply_message: result.message,
      created_at: result.createdAt
    }
  }
}
