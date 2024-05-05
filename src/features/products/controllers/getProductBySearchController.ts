import { Request, Response } from 'express'
import { getProductBySearchService } from '../services/getProductBySearchService'
import { ProductDTO } from '../../../dto/ProductDto'

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
      const searchData = await getProductBySearchService(keyword, limit)
      const response = searchData.map(ProductDTO)
      res.status(200).json({ data: response })
    } else {
      throw new Error('Invalid keyword provided')
    }
  } catch (error) {
    res.status(500).json({ error: 'product not found' })
  }
}
