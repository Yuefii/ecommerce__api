import { NextFunction, Request, Response } from 'express'
import { UserService } from './user.service'
import { UploadedFile } from 'express-fileupload'
import * as dto from '../../dto/users/users-dto'

export class UserController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: dto.CreateUserRequest = req.body as dto.CreateUserRequest
      const response = await UserService.create(request)
      res.status(201).json({
        message: 'Successfully',
        data: response
      })
    } catch (error) {
      next(error)
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: dto.LoginUserRequest = req.body as dto.LoginUserRequest
      const token = await UserService.login(request)
      res.status(200).json({
        message: 'Successfully',
        token: token
      })
    } catch (error) {
      next(error)
    }
  }

  static async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      const ChangePasswordUserRequest =
        req.body as dto.ChangePasswordUserRequest
      await UserService.changePassword(userId, ChangePasswordUserRequest)
      res.status(200).json({
        message: 'Successfully'
      })
    } catch (error) {
      next(error)
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      const response = await UserService.getById(userId)
      res.status(200).json({
        data: response
      })
    } catch (error) {
      next(error)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      const request: dto.UpdateUserRequest = req.body as dto.UpdateUserRequest
      const response = await UserService.update(userId, request)
      res.status(200).json({
        message: 'Successfully',
        updated: response
      })
    } catch (error) {
      next(error)
    }
  }

  static async uploadImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      const imageUrl = req.files?.imageUrl as UploadedFile

      const publicUrl = await UserService.uploadImage(userId, imageUrl)
      res.status(200).json({
        message: 'Successfully',
        avatar: publicUrl
      })
    } catch (error) {
      next(error)
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      await UserService.delete(userId)
      res.status(200).json({
        message: 'Successfully'
      })
    } catch (error) {
      next(error)
    }
  }
}
