import supertest from 'supertest'
import jwt from 'jsonwebtoken'

import { app } from '../src/libs/express'
import { logger } from '../src/libs/winston'
import { AddressTest } from './utils/address'

describe('PUT /v1/users/:userId/address/:addressId/update', () => {
  let token
  let userId
  let addressId
  const userIdNotFound = '66548e25c0a2bbef3bffe532'

  beforeEach(async () => {
    await AddressTest.create()
    userId = await AddressTest.findUnique()
    token = jwt.sign({ userId: userId }, process.env.JWT_SECRET || '')
    addressId = await AddressTest.addAdress()
  })

  afterEach(async () => {
    await AddressTest.delete()
    await AddressTest.deleteAddress()
  })

  it('Should be able update address success', async () => {
    const response = await supertest(app)
      .put(`/v1/users/${userId}/address/${addressId}/update`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        addressLabel: 'testing update success',
        addressComplete: 'testing update success',
        noteToCourier: 'testing update success',
        receiperName: 'testing update success',
        phoneNumber: '0888222222'
      })

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('updated')
    expect(response.body.updated).toHaveProperty('address_id')
    expect(response.body.updated).toHaveProperty('user_id')
    expect(response.body.updated).toHaveProperty('address_label')
    expect(response.body.updated).toHaveProperty('address_complete')
    expect(response.body.updated).toHaveProperty('note_to_courier')
    expect(response.body.updated).toHaveProperty('receiper_name')
    expect(response.body.updated).toHaveProperty('phone_number')
  })

  it('Should throw an error if User with id & address with id not found', async () => {
    const response = await supertest(app)
      .put(`/v1/users/${userIdNotFound}/address/${addressId}/update`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        addressLabel: 'testing update success',
        addressComplete: 'testing update success',
        noteToCourier: 'testing update success',
        receiperName: 'testing update success',
        phoneNumber: '0888222222'
      })

    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe(
      `User with id ${userIdNotFound} & address with id ${addressId} not found`
    )
  })
})

describe('DELETE /v1/users/:userId/address/:addressId/delete', () => {
  let token
  let userId
  let addressId
  const userIdNotFound = '66548e25c0a2bbef3bffe532'

  beforeEach(async () => {
    await AddressTest.create()
    userId = await AddressTest.findUnique()
    token = jwt.sign({ userId: userId }, process.env.JWT_SECRET || '')
    addressId = await AddressTest.addAdress()
  })

  afterEach(async () => {
    await AddressTest.delete()
    await AddressTest.deleteAddress()
  })

  it('Should be able delete address success', async () => {
    const response = await supertest(app)
      .delete(`/v1/users/${userId}/address/${addressId}/delete`)
      .set('Authorization', `Bearer ${token}`)

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Successfully')
  })

  it('Should throw an error if User with id & address with id not found', async () => {
    const response = await supertest(app)
      .delete(`/v1/users/${userIdNotFound}/address/${addressId}/delete`)
      .set('Authorization', `Bearer ${token}`)

    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe(
      `User with id ${userIdNotFound} & address with id ${addressId} not found`
    )
  })
})
