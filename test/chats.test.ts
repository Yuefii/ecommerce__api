import supertest from 'supertest'
import jwt from 'jsonwebtoken'

import { app } from '../src/libs/express'
import { logger } from '../src/libs/winston'
import { ChatTest } from './utils/chats'

describe('POST /v1/chats/room/create', () => {
  let token
  let userId1
  let userId2
  let chatId
  const userIdNotFound = '66548e25c0a2bbef3bffe532'

  beforeEach(async () => {
    await ChatTest.createUser1()
    await ChatTest.createUser2()
    userId1 = await ChatTest.findUniqueUser1()
    userId2 = await ChatTest.findUniqueUser2()
    token = jwt.sign({ userId: userId1 }, process.env.JWT_SECRET || '')
  })

  afterEach(async () => {
    if (chatId) {
      await ChatTest.deleteChat(chatId)
    }
    await ChatTest.deleteUser1()
    await ChatTest.deleteUser2()
  })

  it('Should be able create room chat success', async () => {
    const response = await supertest(app)
      .post('/v1/chats/room/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        participants: [userId1, userId2]
      })

    logger.debug(response.body)
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveProperty('chat_id')
    expect(response.body.data).toHaveProperty('participants')
    expect(response.body.data).toHaveProperty('created_at')
    expect(response.body.data.participants).toHaveProperty('user_id1')
    expect(response.body.data.participants).toHaveProperty('user_id2')

    chatId = response.body.data.chat_id
  })

  it('Should throw an error if at least two participants are required', async () => {
    const response = await supertest(app)
      .post('/v1/chats/room/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        participants: [userId1]
      })

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe('At least two participants are required')
  })

  it('Should throw an error if one or more participants do not exist', async () => {
    const response = await supertest(app)
      .post('/v1/chats/room/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        participants: [userId1, userIdNotFound]
      })

    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe('One or more participants do not exist')
  })
})

describe('GET /v1/chats/:userId/room', () => {
  let token
  let userId1
  let userId2
  const userIdNotFound = '66548e25c0a2bbef3bffe532'

  beforeEach(async () => {
    await ChatTest.createUser1()
    await ChatTest.createUser2()
    userId1 = await ChatTest.findUniqueUser1()
    userId2 = await ChatTest.findUniqueUser2()
    token = jwt.sign({ userId: userId1 }, process.env.JWT_SECRET || '')
  })

  afterEach(async () => {
    await ChatTest.deleteUser1()
    await ChatTest.deleteUser2()
  })

  it('Should be able get all room chat by ID success', async () => {
    const response = await supertest(app)
      .get(`/v1/chats/${userId1}/room`)
      .set('Authorization', `Bearer ${token}`)

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
    expect(Array.isArray(response.body.data)).toBe(true)
    response.body.data.forEach((item) => {
      expect(item).toHaveProperty('chat_id')
      expect(item).toHaveProperty('participants')
      expect(item).toHaveProperty('created_at')

      expect(Array.isArray(item)).toBe(true)
      item.participants.forEach((item) => {
        expect(item).toHaveProperty('user_id')
        expect(item).toHaveProperty('name')
        expect(item).toHaveProperty('username')
        expect(item).toHaveProperty('avatar')
      })
    })
  })

  it('Should throw an error if Id not found', async () => {
    const response = await supertest(app)
      .get(`/v1/chats/${userIdNotFound}/room`)
      .set('Authorization', `Bearer ${token}`)
    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe(
      `User with id ${userIdNotFound} not found`
    )
  })
})
