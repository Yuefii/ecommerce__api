import { Request, Response } from 'express'
import { getAllProductService } from '../services/getAllProductService'
import { getTotalProducts } from '../../../utils/totalProducts'
import { ProductDTO } from '../../../dto/ProductDto'

export const getAllProductController = async (req: Request, res: Response) => {
  let { page = 1, limit = 10 } = req.query
  try {
    page = typeof page === 'string' ? page : '1'
    limit = typeof limit === 'string' ? limit : '10'

    const totalProducts = await getTotalProducts()
    const offset = (parseInt(page) - 1) * parseInt(limit)
    const product = await getAllProductService(offset, parseInt(limit))
    const response = product.map(ProductDTO)
    res.status(200).json({
      pagination: {
        total_products: totalProducts,
        current_pages: parseInt(page),
        total_pages: Math.ceil(totalProducts / parseInt(limit))
      },
      data: response
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
