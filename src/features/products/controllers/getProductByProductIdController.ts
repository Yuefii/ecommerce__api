import { Request, Response } from 'express'
import { getProductByIdService } from '../services/getProductByProductIdService'
import { ProductDTO } from '../../../dto/ProductDto'

export const getProductByProductIdController = async (
  req: Request,
  res: Response
) => {
  const { productId } = req.params
  try {
    const result = await getProductByIdService(productId)
    const DTO = new ProductDTO()
    const response = DTO.fromGet(result)
    res.status(200).json({ data: response })
  } catch (error) {
    console.error(error)
    res.status(404).json({
      statusCode: 404,
      error: 'product not found'
    })
  }
}
