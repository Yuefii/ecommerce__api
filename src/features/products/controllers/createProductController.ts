import { Request, Response } from 'express'
import { createProductService } from '../services/createProductService'
import { ProductDTO } from '../../../dto/ProductDto'

export const createProductController = async (req: Request, res: Response) => {
  try {
    const productData = req.body
    const product = await createProductService(productData)
    const response = ProductDTO(product)
    res.status(200).json({
      message: 'successfully',
      data: response
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
