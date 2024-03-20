import { Request, Response } from "express";
import { createProductService } from "../services/createProductService";

export const createProductController = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        const result = await createProductService(productData);
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
            })),
            owner: {
                owner_id: result.owner.userId,
                name: result.owner.nama,
                email: result.owner.email
            }
        }
        res.status(200).json({
            message: "successfully",
            data: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};