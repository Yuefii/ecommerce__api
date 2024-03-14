import { Request, Response } from "express";
import { updateProductService } from "../../services/products/updateProductService";

export const updateProductController = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        const productData = req.body;
        const result = await updateProductService(productId, productData);
        const response = {
            product_id: result.productId,
            nama: result.nama,
            description: result.description,
            price: result.price,
            brand: result.brand,
            category: result.category,
            quantity: result.quantity,
            images: result.images.map(item => ({
                img_id: item.imgId,
                color: item.color,
                colorCode: item.colorCode,
                img_url: item.url,
            }))
        }
        res.json({
            message: "successfully",
            updated: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};