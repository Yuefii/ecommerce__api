import { Request, Response } from 'express'
import { getProductByIdService } from '../services/getProductByProductIdService'
import { ProductDTO } from '../../../dto/ProductDto'

export const getProductByProductIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const productId = req.params.productId
    const product = await getProductByIdService(productId)
    const response = ProductDTO(product)
    res.status(200).json({ data: response })
  } catch (error) {
    console.error(error)
    res.status(404).json({
      statusCode: 404,
      error: 'product not found'
    })
  }
}
