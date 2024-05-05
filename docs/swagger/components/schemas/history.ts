export const historyInput = {
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    category: {
      type: 'string'
    }
  },
  required: ['title', 'category']
}

export const historyResponse = {
  type: 'object',
  properties: {
    message: { type: 'string' },
    data: {
      type: 'object',
      properties: {
        user_id: { type: 'string' },
        history_id: { type: 'string' },
        title: { type: 'string' },
        category: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            user_history_id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' }
          }
        }
      }
    }
  }
}
