import { ProductDTO } from '../../../dto/product-dto'
import { Request, Response } from 'express'
import { createProductService } from '../services/createProductService'

export const createProductController = async (req: Request, res: Response) => {
  try {
    const productData = req.body
    const result = await createProductService(productData)
    const DTO = new ProductDTO()
    const response = DTO.fromCreate(result)
    res.status(201).json({
      message: 'successfully',
      data: response
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
