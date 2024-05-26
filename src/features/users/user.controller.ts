import path from 'path'

import { NextFunction, Request, Response } from 'express'
import { UserService } from './user.service'
import { UserDTO } from '../../dto/user-dto'
import { bucket } from '../../libs/firebase'
import { UploadedFile } from 'express-fileupload'

export class UserController {
  private userService: UserService
  private dto: UserDTO

  constructor() {
    this.userService = new UserService()
    this.dto = new UserDTO()
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body
      const result = await this.userService.createUser(userData)
      const response = this.dto.fromCreate(result)
      res.status(201).json({
        message: 'Successfully',
        status: 201,
        data: response
      })
    } catch (error) {
      next(error)
    }
  }

  async getAllUser(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.userService.getAllUser()
      const response = result.map((item) => this.dto.fromGet(item))
      res.status(200).json({
        data: response
      })
    } catch (error) {
      next(error)
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      const result = await this.userService.getUserById(userId)
      const response = this.dto.fromGet(result)
      res.status(200).json({
        data: response
      })
    } catch (error) {
      next(error)
    }
  }

  async getUserBySearch(req: Request, res: Response, next: NextFunction) {
    try {
      const keyword = req.query.q?.toString()
      const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 10
      if (typeof keyword === 'string') {
        const result = await this.userService.getUserBySearch(keyword, limit)
        const response = result.map((item) => this.dto.fromSearch(item))
        res.status(200).json({
          data: response
        })
      } else {
        throw new Error('invalid keyboard provided')
      }
    } catch (error) {
      next(error)
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      const userData = req.body
      const result = await this.userService.updateUser(userId, userData)
      const response = this.dto.fromCreate(result)
      res.status(200).json({
        message: 'Successfully',
        status: 200,
        updated: response
      })
    } catch (error) {
      next(error)
    }
  }

  async changePasswordUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      const userData = req.body
      await this.userService.changePasswordUser(userId, userData)
      res.status(200).json({
        message: 'successfully',
        status: 200
      })
    } catch (error) {
      next(error)
    }
  }

  async uploadImageUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files || !req.files.imageUrl) {
        return res.status(400).json({ error: 'No files uploaded.' })
      }
      if (!req.params || !req.params.userId) {
        return res.status(400).json({ error: 'User ID is required.' })
      }
      const { userId } = req.params
      const imageUrl = req.files.imageUrl as UploadedFile
      const fileExtension = path.extname(imageUrl.name)
      const fileName = `${userId}${fileExtension}`
      const blob = bucket.file(`profile_photos/${fileName}`)
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: imageUrl.mimetype
        }
      })

      blobStream.on('error', (err) => {
        console.error(err)
        res.status(500).json({ error: 'Failed to upload image.' })
      })

      blobStream.on('finish', async () => {
        try {
          const publicUrl = await blob.getSignedUrl({
            action: 'read',
            expires: '03-01-2050'
          })

          await this.userService.uploadImageUser(userId, publicUrl[0])

          res.status(200).json({
            message: 'Successfully.',
            avatar: publicUrl[0]
          })
        } catch (error) {
          console.error(error)
          res.status(500).json({ error: 'Failed to get public URL.' })
        }
      })

      blobStream.end(imageUrl.data)
    } catch (error) {
      next(error)
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body
      const token = await this.userService.loginUser(userData)
      res.status(200).json({
        message: 'Successfully',
        status: 200,
        token: token
      })
    } catch (error) {
      next(error)
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      await this.userService.deleteUser(userId)
      res.status(200).json({
        message: 'Successfully',
        status: 200
      })
    } catch (error) {
      next(error)
    }
  }
}
