import supertest from 'supertest'
import jwt from 'jsonwebtoken'

import { app } from '../src/libs/express'
import { logger } from '../src/libs/winston'
import { MessageTest } from './utils/message'

describe('POST /v1/chats/room/:chatId/sender/:senderId/message', () => {
  let token
  let userId1
  let userId2
  let chatId
  let messageId
  const userIdNotFound = '66548e25c0a2bbef3bffe532'

  beforeEach(async () => {
    await MessageTest.createUser1()
    await MessageTest.createUser2()
    userId1 = await MessageTest.findUniqueUser1()
    userId2 = await MessageTest.findUniqueUser2()
    token = jwt.sign({ userId: userId1 }, process.env.JWT_SECRET || '')
    chatId = await MessageTest.createChat(userId1, userId2)
    await MessageTest.createMessage(chatId)
  })

  afterEach(async () => {
    await MessageTest.deleteMessage(messageId)
    await MessageTest.deleteChat(chatId)
    await MessageTest.deleteUser1()
    await MessageTest.deleteUser2()
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
  let messageId
  const chatIdNotFound = '66548e25c0a2bbef3bffe532'

  beforeEach(async () => {
    await MessageTest.createUser1()
    await MessageTest.createUser2()
    userId1 = await MessageTest.findUniqueUser1()
    userId2 = await MessageTest.findUniqueUser2()
    token = jwt.sign({ userId: userId1 }, process.env.JWT_SECRET || '')
    chatId = await MessageTest.createChat(userId1, userId2)
    await MessageTest.createMessage(chatId)
  })

  afterEach(async () => {
    await MessageTest.deleteMessage(messageId)
    await MessageTest.deleteChat(chatId)
    await MessageTest.deleteUser1()
    await MessageTest.deleteUser2()
  })
  it('Should be able get message by ID success', async () => {
    const response = await supertest(app)
      .get(`/v1/chats/room/${chatId}/message`)
      .set('Authorization', `Bearer ${token}`)

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
    expect(Array.isArray(response.body.data)).toBe(true)
    response.body.data.forEach((item) => {
      expect(item).toHaveProperty('chat_id')
      expect(item).toHaveProperty('message')
      expect(item).toHaveProperty('sender')
      expect(item).toHaveProperty('created_at')
      expect(item.message).toHaveProperty('message_id')
      expect(item.message).toHaveProperty('content')
      expect(item.sender).toHaveProperty('sender_id')
      expect(item.sender).toHaveProperty('name')
      expect(item.sender).toHaveProperty('username')
      expect(item.sender).toHaveProperty('avatar')
    })
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
