import { ProductDTO } from '../../../dto/ProductDto'
import { Request, Response } from 'express'
import { getProductBySearchService } from '../services/getProductBySearchService'

export const getProductBySearchController = async (
  req: Request,
  res: Response
) => {
  try {
    const keyword: string | undefined = req.query.q?.toString()
    const limit: number = req.query.limit
      ? parseInt(req.query.limit.toString())
      : 10
    if (typeof keyword === 'string') {
      const result = await getProductBySearchService(keyword, limit)
      const DTO = new ProductDTO()
      const response = result.map((item) => DTO.fromGet(item))
      res.status(200).json({ data: response })
    } else {
      throw new Error('Invalid keyword provided')
    }
  } catch (error) {
    res.status(500).json({ error: 'product not found' })
  }
}
