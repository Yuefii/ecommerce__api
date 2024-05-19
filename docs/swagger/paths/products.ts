export const getAllProducts = {
  get: {
    tags: ['Products'],
    summary: 'get all products',
    responses: {
      200: {
        description: 'Successful operation',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ProductList'
            }
          }
        }
      }
    }
  }
}

export const getProductById = {
  get: {
    tags: ['Products'],
    summary: 'get product by productId',
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
        description: 'Successful operation'
      }
    }
  }
}

export const getProductBySearch = {
  get: {
    tags: ['Products'],
    summary: 'search products',
    parameters: [
      {
        name: 'q',
        in: 'query',
        description: 'Keyword for product search',
        required: true,
        schema: {
          type: 'string'
        }
      },
      {
        name: 'limit',
        in: 'query',
        description: 'Maximum number of products to return',
        required: false,
        schema: {
          type: 'integer',
          default: 10
        }
      }
    ],
    responses: {
      200: {
        description: 'Successful operation',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ProductList'
            }
          }
        }
      }
    }
  }
}
