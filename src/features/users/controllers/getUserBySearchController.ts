import { Request, Response } from 'express'
import { getUserBySearchService } from '../services/getUserBySearchService'
import { UserInfoDTO } from '../../../dto/UserDto'

export const getUserBySearchController = async (
  req: Request,
  res: Response
) => {
  try {
    const keyword: string | undefined = req.query.q?.toString()
    const limit: number = req.query.limit
      ? parseInt(req.query.limit.toString())
      : 10
    if (typeof keyword === 'string') {
      const result = await getUserBySearchService(keyword, limit)
      const response = result.map(UserInfoDTO)
      res.status(200).json({ data: response })
    } else {
      throw new Error('Invalid keyword provided')
    }
  } catch (error) {
    res.status(500).json({ error: 'user not found' })
  }
}
