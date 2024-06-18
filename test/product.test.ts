import jwt from 'jsonwebtoken'
import supertest from 'supertest'

import { app } from '../src/libs/express'
import { logger } from '../src/libs/winston'
import { ProductTest } from './utils/product'

describe('POST /v1/products/:ownerId', () => {
  let token
  let ownerId
  const userIdNotFound = '66548e25c0a2bbef3bffe532'

  beforeEach(async () => {
    await ProductTest.create()
    ownerId = await ProductTest.findUnique()
    token = jwt.sign({ userId: ownerId }, process.env.JWT_SECRET || '')
  })

  afterEach(async () => {
    await ProductTest.delete()
  })

  it('Should throw an error if Id not found', async () => {
    const response = await supertest(app)
      .post(`/v1/products/${userIdNotFound}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'testing name',
        description: 'testing description',
        brand: 'testing brand',
        price: 500000,
        category: 'testing category'
      })
    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe(
      `User with id ${userIdNotFound} not found`
    )
  })

  it('Should be able to create product success', async () => {
    const response = await supertest(app)
      .post(`/v1/products/${ownerId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'testing name',
        description: 'testing description',
        brand: 'testing brand',
        price: 500000,
        category: 'testing category'
      })
    logger.debug(response.body)
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message')
  })
})
