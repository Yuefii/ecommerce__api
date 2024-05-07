import { Request, Response } from 'express'
import { deleteProductService } from '../services/deleteProductService'

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    await deleteProductService(productId)
    res.status(200).json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
