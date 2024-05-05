export const createUser = {
  post: {
    tags: ['Users'],
    summary: 'create/register a new user.',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/UserInput'
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
              $ref: '#/components/schemas/UserResponse'
            }
          }
        }
      }
    }
  }
}
export const loginUser = {
  post: {
    tags: ['Users'],
    summary: 'user login.',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/LoginInput'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Successful operation',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginResponse'
            }
          }
        }
      }
    }
  }
}

export const getAllUsers = {
  get: {
    tags: ['Users'],
    summary: 'get all users',
    responses: {
      200: {
        description: 'Successful operation',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UsersList'
            }
          }
        }
      }
    }
  }
}

export const getUserById = {
  get: {
    tags: ['Users'],
    summary: 'get user by Id',
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
        description: 'Successful operation'
      }
    }
  }
}
