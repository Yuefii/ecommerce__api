import path from 'path'

import { Request, Response } from 'express'

export const UserImageUrl = async (req: Request, res: Response) => {
  const { imageName } = req.params
  const imagePath = path.join(__dirname, '../../public/user', imageName)
  res.sendFile(imagePath)
}
