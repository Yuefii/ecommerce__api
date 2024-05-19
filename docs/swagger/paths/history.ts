export const getHistoryByUserId = {
  get: {
    tags: ['History'],
    parameters: [
      {
        name: 'userId',
        in: 'path',
        description: 'ID of user to return',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    responses: {
      200: {
        description: 'Successful operation',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/HistoryResponse'
            }
          }
        }
      }
    }
  }
}

export const createHistory = {
  post: {
    tags: ['History'],
    parameters: [
      {
        name: 'userId',
        in: 'path',
        description: 'ID of user to return',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/HistoryInput'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Successful operation',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/HistoryResponse'
            }
          }
        }
      }
    }
  }
}

export const deleteHistory = {
  delete: {
    tags: ['History'],
    parameters: [
      {
        name: 'historyId',
        in: 'path',
        description: 'ID of history to return',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    responses: {
      200: {
        description: 'Successful operation',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'history deleted successfully'
                }
              }
            }
          }
        }
      }
    }
  }
}
