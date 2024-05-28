import express from 'express'
import { UserController } from '../features/users/user.controller'

export const publicRouter = express.Router()

publicRouter.post('/v1/users/register', UserController.create)
publicRouter.post('/v1/users/login', UserController.login)
