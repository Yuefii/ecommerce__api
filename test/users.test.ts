import supertest from 'supertest'
import jwt from 'jsonwebtoken'

import { app } from '../src/libs/express'
import { logger } from '../src/libs/winston'
import { UserTest } from './utils/users'

describe('POST /v1/users/register', () => {
  afterAll(async () => {
    await UserTest.delete()
  })

  it('Should be able create/register new user success', async () => {
    const response = await supertest(app).post('/v1/users/register').send({
      name: 'unit testing',
      email: 'testing@gmail.com',
      password: 'unittesting'
    })
    logger.debug(response.body)
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveProperty('user_id')
    expect(response.body.data).toHaveProperty('name')
    expect(response.body.data).toHaveProperty('email')
    expect(response.body.message).toBe('Successfully')
    expect(response.body.data.name).toBe('unit testing')
    expect(response.body.data.email).toBe('testing@gmail.com')
  })

  it('Should throw an error if email already exist', async () => {
    const response = await supertest(app).post('/v1/users/register').send({
      name: 'unit testing',
      email: 'testing@gmail.com',
      password: 'unittesting'
    })
    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe('Email already use.')
  })
})

describe('POST /v1/users/login', () => {
  beforeEach(async () => {
    await UserTest.create()
  })

  afterEach(async () => {
    await UserTest.delete()
  })

  it('Should be able login user success', async () => {
    const response = await supertest(app).post('/v1/users/login').send({
      email: 'testing@gmail.com',
      password: 'unittesting'
    })

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('token')
    expect(response.body.message).toBe('Successfully')
    expect(response.body.token).toBeDefined()
  })

  it('Should throw an error if password or email invalid', async () => {
    const response = await supertest(app).post('/v1/users/login').send({
      email: '',
      password: ''
    })

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe('Email & Password not valid')
  })
})

describe('PUT /v1/users/${userId}/change-password', () => {
  let token
  let userId
  const userIdNotFound = '66548e25c0a2bbef3bffe532'

  beforeEach(async () => {
    await UserTest.create()
    userId = await UserTest.findUnique()
    token = jwt.sign({ userId: userId }, process.env.JWT_SECRET || '')
  })

  afterEach(async () => {
    await UserTest.delete()
  })

  it('Should change new password user success', async () => {
    const response = await supertest(app)
      .put(`/v1/users/${userId}/change-password`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        currentPassword: 'unittesting',
        newPassword: 'unittesting',
        confirmPassword: 'unittesting'
      })

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Successfully')
  })

  it('Should throw an error if current password doesnt match', async () => {
    const response = await supertest(app)
      .put(`/v1/users/${userId}/change-password`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        currentPassword: 'unittestingwrong',
        newPassword: 'unittesting',
        confirmPassword: 'unittesting'
      })

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe('Old password does not match')
  })

  it('Should throw an error if current password doesnt match', async () => {
    const response = await supertest(app)
      .put(`/v1/users/${userId}/change-password`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        currentPassword: 'unittestingwrong',
        newPassword: 'unittesting',
        confirmPassword: 'unittesting'
      })

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe('Old password does not match')
  })

  it('Should throw an error if Id not found', async () => {
    const response = await supertest(app)
      .put(`/v1/users/${userIdNotFound}/change-password`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        currentPassword: 'unittesting',
        newPassword: 'unittesting',
        confirmPassword: 'unittesting'
      })
    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe(
      `User with id ${userIdNotFound} not found`
    )
  })
})

describe('GET /v1/users/${userId}', () => {
  let token
  let userId
  const userIdNotFound = '66548e25c0a2bbef3bffe532'

  beforeEach(async () => {
    await UserTest.create()
    userId = await UserTest.findUnique()
    token = jwt.sign({ userId: userId }, process.env.JWT_SECRET || '')
  })

  afterEach(async () => {
    await UserTest.delete()
  })

  it('Should be able get user by ID success', async () => {
    const response = await supertest(app)
      .get(`/v1/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveProperty('user_id')
    expect(response.body.data).toHaveProperty('chat_id')
    expect(response.body.data).toHaveProperty('name')
    expect(response.body.data).toHaveProperty('username')
    expect(response.body.data).toHaveProperty('email')
    expect(response.body.data).toHaveProperty('avatar')
    expect(response.body.data).toHaveProperty('bio')
    expect(response.body.data).toHaveProperty('gender')
    expect(response.body.data).toHaveProperty('phone_number')
    expect(response.body.data).toHaveProperty('created_at')
    expect(response.body.data).toHaveProperty('updated_at')
  })

  it('Should throw an error if Id not found', async () => {
    const response = await supertest(app)
      .get(`/v1/users/${userIdNotFound}`)
      .set('Authorization', `Bearer ${token}`)

    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe(
      `User with id ${userIdNotFound} not found`
    )
  })
})

describe('PATCH /v1/users/${userId}/update', () => {
  let token
  let userId
  const userIdNotFound = '66548e25c0a2bbef3bffe532'

  beforeEach(async () => {
    await UserTest.create()
    userId = await UserTest.findUnique()
    token = jwt.sign({ userId: userId }, process.env.JWT_SECRET || '')
  })

  afterEach(async () => {
    await UserTest.delete()
    await UserTest.deleteAddress()
    await UserTest.deleteDateOfBirth()
  })

  it('Should be able update user by ID success', async () => {
    const response = await supertest(app)
      .patch(`/v1/users/${userId}/update`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'testing update',
        username: 'testing',
        email: 'testing@gmail.com',
        phoneNumber: '0887676767676',
        bio: 'testing user untuk update',
        gender: 'pria',
        address: [
          {
            addressLabel: 'kantor',
            addressComplete: 'jln. raya testing update',
            noteToCourier: 'taro diluar karna tidak ada orang',
            receiperName: 'testing',
            phoneNumber: '0887676767676'
          }
        ],
        dateOfBirth: [
          {
            date: '01',
            month: '02',
            year: '2006'
          }
        ]
      })

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Successfully')

    expect(response.body).toHaveProperty('updated')
    expect(response.body.updated).toHaveProperty('user_id')
    expect(response.body.updated).toHaveProperty('chat_id')
    expect(response.body.updated).toHaveProperty('name')
    expect(response.body.updated).toHaveProperty('username')
    expect(response.body.updated).toHaveProperty('email')
    expect(response.body.updated).toHaveProperty('avatar')
    expect(response.body.updated).toHaveProperty('bio')
    expect(response.body.updated).toHaveProperty('gender')
    expect(response.body.updated).toHaveProperty('address')
    expect(response.body.updated).toHaveProperty('date_of_birth')
    expect(response.body.updated).toHaveProperty('phone_number')
    expect(response.body.updated).toHaveProperty('created_at')
    expect(response.body.updated).toHaveProperty('updated_at')

    expect(Array.isArray(response.body.updated.address)).toBe(true)
    response.body.updated.address.forEach((address) => {
      expect(address).toHaveProperty('address_id')
      expect(address).toHaveProperty('address_label')
      expect(address).toHaveProperty('address_complete')
      expect(address).toHaveProperty('note_to_courier')
      expect(address).toHaveProperty('receiper_name')
      expect(address).toHaveProperty('phone_number')
    })

    expect(Array.isArray(response.body.updated.date_of_birth)).toBe(true)
    response.body.updated.date_of_birth.forEach((item) => {
      expect(item).toHaveProperty('date')
      expect(item).toHaveProperty('month')
      expect(item).toHaveProperty('year')
    })
  })

  it('Should throw an error if gender not be either pria or wanita', async () => {
    const response = await supertest(app)
      .patch(`/v1/users/${userId}/update`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        gender: 'invalid'
      })

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe('Gender must be either pria or wanita')
  })

  it('Should throw an error if user have more than 3 addresses', async () => {
    const response = await supertest(app)
      .patch(`/v1/users/${userId}/update`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        address: [
          {
            addressLabel: 'kantor',
            addressComplete: 'jln. raya testing update',
            noteToCourier: 'taro diluar karna tidak ada orang',
            receiperName: 'testing',
            phoneNumber: '0887676767676'
          },
          {
            addressLabel: 'kantor',
            addressComplete: 'jln. raya testing update',
            noteToCourier: 'taro diluar karna tidak ada orang',
            receiperName: 'testing',
            phoneNumber: '0887676767676'
          },
          {
            addressLabel: 'kantor',
            addressComplete: 'jln. raya testing update',
            noteToCourier: 'taro diluar karna tidak ada orang',
            receiperName: 'testing',
            phoneNumber: '0887676767676'
          },
          {
            addressLabel: 'kantor',
            addressComplete: 'jln. raya testing update',
            noteToCourier: 'taro diluar karna tidak ada orang',
            receiperName: 'testing',
            phoneNumber: '0887676767676'
          }
        ]
      })

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe('User cannot have more than 3 addresses')
  })

  it('Should throw an error if Id not found', async () => {
    const response = await supertest(app)
      .patch(`/v1/users/${userIdNotFound}/update`)
      .set('Authorization', `Bearer ${token}`)

    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe(
      `User with id ${userIdNotFound} not found`
    )
  })
})

describe('PUT /v1/users/${userId}/upload-image', () => {
  let token
  let userId
  const userIdNotFound = '66548e25c0a2bbef3bffe532'

  beforeEach(async () => {
    await UserTest.create()
    userId = await UserTest.findUnique()
    token = jwt.sign({ userId: userId }, process.env.JWT_SECRET || '')
  })

  afterEach(async () => {
    await UserTest.delete()
  })

  it('Should throw an error if no files uploaded', async () => {
    const response = await supertest(app)
      .put(`/v1/users/${userId}/upload-image`)
      .set('Authorization', `Bearer ${token}`)
      .field('imageUrl', '')

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe('No files uploaded')
  })

  it('Should throw an error if failed to upload image', async () => {
    const response = await supertest(app)
      .put(`/v1/users/${userId}/upload-image`)
      .set('Authorization', `Bearer ${token}`)
      .field('imageUrl', 'image.txt')

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe('No files uploaded')
  })

  it('Should throw an error if Id not found', async () => {
    const imageFile = {
      name: 'test.jpg',
      mimetype: 'image/jpeg',
      data: Buffer.from('mock file data')
    }
    const response = await supertest(app)
      .put(`/v1/users/${userIdNotFound}/upload-image`)
      .set('Authorization', `Bearer ${token}`)
      .attach('imageUrl', imageFile.data, imageFile.name)

    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe(
      `User with id ${userIdNotFound} not found`
    )
    await UserTest.deleteImage(userIdNotFound)
  })

  it('Should be able upload image success', async () => {
    const imageFile = {
      name: 'test.jpg',
      mimetype: 'image/jpeg',
      data: Buffer.from('mock file data')
    }
    const response = await supertest(app)
      .put(`/v1/users/${userId}/upload-image`)
      .set('Authorization', `Bearer ${token}`)
      .attach('imageUrl', imageFile.data, imageFile.name)

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('avatar')
    expect(response.body.message).toBe('Successfully')
    expect(response.body.avatar).toBeDefined()

    await UserTest.deleteImage(userId)
  })
})

describe('DELETE /v1/users/${userId}/delete', () => {
  let token
  let userId
  const userIdNotFound = '66548e25c0a2bbef3bffe532'

  beforeEach(async () => {
    await UserTest.create()
    userId = await UserTest.findUnique()
    token = jwt.sign({ userId: userId }, process.env.JWT_SECRET || '')
  })

  afterEach(async () => {
    await UserTest.delete()
  })

  it('Should be able delete user success', async () => {
    const response = await supertest(app)
      .delete(`/v1/users/${userId}/delete`)
      .set('Authorization', `Bearer ${token}`)

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Successfully')
  })

  it('Should throw an error if Id not found', async () => {
    const response = await supertest(app)
      .delete(`/v1/users/${userIdNotFound}/delete`)
      .set('Authorization', `Bearer ${token}`)

    logger.debug(response.body)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toBe(
      `User with id ${userIdNotFound} not found`
    )
  })
})
