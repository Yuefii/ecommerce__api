import { ProductDTO } from '../../../dto/product-dto'
import { Request, Response } from 'express'
import { updateProductService } from '../services/updateProductService'

export const updateProductController = async (req: Request, res: Response) => {
  const { productId, userId } = req.params
  const productData = req.body
  try {
    const result = await updateProductService(productId, userId, productData)
    const DTO = new ProductDTO()
    const response = DTO.fromCreate(result)
    res.status(200).json({
      message: 'successfully',
      updated: response
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
