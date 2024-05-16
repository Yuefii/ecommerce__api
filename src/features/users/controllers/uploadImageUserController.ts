import path from 'path'
import dotenv from 'dotenv'

import { Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import { uploadImageUserService } from '../services/uploadImageUserService'

dotenv.config()
const baseUrl = process.env.BASE_URL + 'public/user/'

export const uploadImageUserController = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.files || !req.files.imageUrl) {
      return res.status(400).json({ error: 'No files uploaded.' })
    }

    if (!req.params) {
      return res.status(400).json({ error: 'Request params cannot be empty.' })
    }

    const { userId } = req.params
    const imageUrl = req.files.imageUrl as UploadedFile
    const fileExtension = path.extname(imageUrl.name)
    const fileName = userId + fileExtension

    imageUrl.mv(
      path.join(__dirname, '../../../../', 'public/user', fileName),
      async (err) => {
        if (err) {
          return res.status(500).json({ error: err })
        }

        await uploadImageUserService(userId, fileName)
        res.status(200).json({
          message: 'successfully',
          imageUrl: baseUrl + fileName
        })
      }
    )
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
