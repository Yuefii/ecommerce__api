import supertest from 'supertest'
import jwt from 'jsonwebtoken'

import { app } from '../src/libs/express'
import { logger } from '../src/libs/winston'
import { HistoryTest } from './utils/history'

describe('POST /v1/users/:userId/history', () => {
  let token
  let userId
  const userIdNotFound = '66548e25c0a2bbef3bffe532'

  beforeEach(async () => {
    await HistoryTest.create()
    userId = await HistoryTest.findUnique()
    token = jwt.sign({ userId: userId }, process.env.JWT_SECRET || '')
  })

  afterEach(async () => {
    await HistoryTest.delete()
  })

  it('Should be able to create history success', async () => {
    const response = await supertest(app)
      .post(`/v1/users/${userId}/history`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'testing title',
        category: 'testing category'
      })
    logger.debug(response.body)
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveProperty('user_id')
    expect(response.body.data).toHaveProperty('history_id')
    expect(response.body.data).toHaveProperty('title')
    expect(response.body.data).toHaveProperty('category')
  })

  it('Should throw an error if Id not found', async () => {
    const response = await supertest(app)
      .post(`/v1/users/${userIdNotFound}/history`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'testing title',
        category: 'testing category'
      })
    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe(
      `User with id ${userIdNotFound} not found`
    )
  })
})

describe('GET /v1/users/:userId/historys', () => {
  let token
  let userId
  const userIdNotFound = '66548e25c0a2bbef3bffe532'

  beforeEach(async () => {
    await HistoryTest.create()
    userId = await HistoryTest.findUnique()
    token = jwt.sign({ userId: userId }, process.env.JWT_SECRET || '')
  })

  afterEach(async () => {
    await HistoryTest.delete()
  })

  it('Should be able to get history by ID success', async () => {
    const response = await supertest(app)
      .get(`/v1/users/${userId}/historys`)
      .set('Authorization', `Bearer ${token}`)
    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
    expect(Array.isArray(response.body.data)).toBe(true)
    response.body.data.forEach((item) => {
      expect(item).toHaveProperty('user_id')
      expect(item).toHaveProperty('history_id')
      expect(item).toHaveProperty('title')
      expect(item).toHaveProperty('category')
    })
  })

  it('Should throw an error if Id not found', async () => {
    const response = await supertest(app)
      .get(`/v1/users/${userIdNotFound}/historys`)
      .set('Authorization', `Bearer ${token}`)
    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe(
      `User with id ${userIdNotFound} not found`
    )
  })
})

describe('DELETE /v1/users/${historyId}/delete', () => {
  let token
  let historyId
  let userId
  const userIdNotFound = '66548e25c0a2bbef3bffe532'

  beforeEach(async () => {
    await HistoryTest.create()
    userId = await HistoryTest.findUnique()
    token = jwt.sign({ userId: userId }, process.env.JWT_SECRET || '')
    await HistoryTest.createHistory(userId)
    const historyIds = await HistoryTest.findHistory(userId)
    historyId = historyIds.length > 0 ? historyIds[0] : null
  })

  afterEach(async () => {
    await HistoryTest.delete()
  })

  it('Should be able delete user success', async () => {
    const response = await supertest(app)
      .delete(`/v1/users/${historyId}/history/delete`)
      .set('Authorization', `Bearer ${token}`)

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Successfully')
  })

  it('Should throw an error if Id not found', async () => {
    const response = await supertest(app)
      .delete(`/v1/users/${userIdNotFound}/history/delete`)
      .set('Authorization', `Bearer ${token}`)

    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe(
      `History with id ${userIdNotFound} not found`
    )
  })
})
