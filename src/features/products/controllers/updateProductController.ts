import { Request, Response } from "express";
import { updateProductService } from "../services/updateProductService";
import { ProductUpdateDTO } from "../../../dto/ProductDto";

export const updateProductController = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        const productData = req.body;
        const product = await updateProductService(productId, productData);
        const response = ProductUpdateDTO(product)
        res.status(200).json({
            message: "successfully",
            updated: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};