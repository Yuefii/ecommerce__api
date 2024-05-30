import supertest from 'supertest'
import jwt from 'jsonwebtoken'

import { app } from '../src/libs/express'
import { logger } from '../src/libs/winston'
import { ChatTest } from './utils/chats'
import { MessageTest } from './utils/message'

describe('POST /v1/chats/room/:chatId/sender/:senderId/message', () => {
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
    chatId = await MessageTest.createChat(userId1, userId2)
    await MessageTest.createMessage(chatId)
  })

  afterEach(async () => {
    await ChatTest.deleteUser1()
    await ChatTest.deleteUser2()
  })

  it('Should be able create messagge success', async () => {
    const response = await supertest(app)
      .post(`/v1/chats/room/${chatId}/sender/${userId1}/message`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        text: 'Hello good morning'
      })

    logger.debug(response.body)
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveProperty('chat_id')
    expect(response.body.data).toHaveProperty('message')
    expect(response.body.data).toHaveProperty('sender')
    expect(response.body.data).toHaveProperty('created_at')
    expect(response.body.data.message).toHaveProperty('message_id')
    expect(response.body.data.message).toHaveProperty('content')
    expect(response.body.data.sender).toHaveProperty('sender_id')
    expect(response.body.data.sender).toHaveProperty('name')
    expect(response.body.data.sender).toHaveProperty('username')
    expect(response.body.data.sender).toHaveProperty('avatar')
  })

  it('Should throw an error if Chat with id & sender with id not found', async () => {
    const response = await supertest(app)
      .post(`/v1/chats/room/${chatId}/sender/${userIdNotFound}/message`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        text: 'Hello good morning'
      })

    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe(
      `Chat with id ${chatId} & sender with id ${userIdNotFound} not found`
    )
  })
})

describe('GET /v1/chats/room/:chatId/message', () => {
  let token
  let userId1
  let userId2
  let chatId
  const chatIdNotFound = '66548e25c0a2bbef3bffe532'

  beforeEach(async () => {
    await ChatTest.createUser1()
    await ChatTest.createUser2()
    userId1 = await ChatTest.findUniqueUser1()
    userId2 = await ChatTest.findUniqueUser2()
    token = jwt.sign({ userId: userId1 }, process.env.JWT_SECRET || '')
    chatId = await MessageTest.createChat(userId1, userId2)
    await MessageTest.createMessage(chatId)
  })

  afterEach(async () => {
    await ChatTest.deleteUser1()
    await ChatTest.deleteUser2()
  })

  it('Should be able get message by ID success', async () => {
    const response = await supertest(app)
      .get(`/v1/chats/room/${chatId}/message`)
      .set('Authorization', `Bearer ${token}`)

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
    expect(Array.isArray(response.body.data)).toBe(true)
  })

  it('Should throw an error if Chat with id not found', async () => {
    const response = await supertest(app)
      .get(`/v1/chats/room/${chatIdNotFound}/message`)
      .set('Authorization', `Bearer ${token}`)

    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe(
      `Chat with id ${chatIdNotFound} not found`
    )
  })
})
