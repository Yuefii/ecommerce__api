import { Request, Response } from "express";
import { getProductByIdService } from "../../services/products/getProductByProductIdService";

export const getProductByProductIdController = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        const result = await getProductByIdService(productId);
        if (!result) {
            return res.status(404).json({ error: 'product not found' });
        }
        const response = {
            product_id: result.productId,
            name: result.nama,
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
            review: result.review.map(item => ({
                reviewId: item.reviewId,
                comment: item.comment,
                rating: item.rating,
                user: {
                    userId: item.users.userId,
                    nama: item.users.nama,
                    email: item.users.email
                }
            }))
        }
        res.json({ data: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};