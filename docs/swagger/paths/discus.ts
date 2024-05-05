export const getDiscusByProductId = {
  get: {
    tags: ['Discus'],
    parameters: [
      {
        name: 'productId',
        in: 'path',
        description: 'ID of product to return',
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
              $ref: '#/components/schemas/DiscusResponse'
            }
          }
        }
      }
    }
  }
}

export const createDiscus = {
  post: {
    tags: ['Discus'],
    parameters: [
      {
        name: 'productId',
        in: 'path',
        description: 'ID of product to return',
        required: true,
        schema: {
          type: 'string'
        }
      },
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
            $ref: '#/components/schemas/DiscusInput'
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
              $ref: '#/components/schemas/DiscusResponse'
            }
          }
        }
      }
    }
  }
}

export const createReplyDiscus = {
  post: {
    tags: ['Discus'],
    parameters: [
      {
        name: 'discusId',
        in: 'path',
        description: 'ID of discus to return',
        required: true,
        schema: {
          type: 'string'
        }
      },
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
            $ref: '#/components/schemas/DiscusReplyInput'
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
              $ref: '#/components/schemas/DiscusReplyResponse'
            }
          }
        }
      }
    }
  }
}

export const deleteDiscus = {
  delete: {
    tags: ['Discus'],
    parameters: [
      {
        name: 'discusId',
        in: 'path',
        description: 'ID of discus to return',
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
                  example: 'discus deleted successfully'
                }
              }
            }
          }
        }
      }
    }
  }
}
