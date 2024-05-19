export const productList = {
  type: 'object',
  properties: {
    pagination: {
      type: 'object',
      properties: {
        total_products: { type: 'integer' },
        current_page: { type: 'integer' },
        total_pages: { type: 'integer' }
      }
    },
    data: {
      type: 'array',
      items: { $ref: '#/components/schemas/Product' }
    }
  }
}
export const product = {
  type: 'object',
  properties: {
    product_id: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
    brand: { type: 'string' },
    category: { type: 'string' },
    quantity: { type: 'integer' },
    images: {
      type: 'array',
      items: { $ref: '#/components/schemas/Image' }
    },
    owner: {
      type: 'object',
      properties: {
        owner_id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' }
      }
    },
    review: {
      type: 'array',
      items: { $ref: '#/components/schemas/Review' }
    }
  }
}
export const image = {
  type: 'object',
  properties: {
    img_id: { type: 'string' },
    color: { type: 'string' },
    colorCode: { type: 'string' },
    img_url: { type: 'string' }
  }
}
export const review = {
  type: 'object',
  properties: {
    review_id: { type: 'string' },
    comment: { type: 'string' },
    rating: { type: 'integer' },
    user: {
      type: 'object',
      properties: {
        user_id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' }
      }
    }
  }
}
