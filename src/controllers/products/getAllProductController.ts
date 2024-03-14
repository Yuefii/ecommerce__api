import { Request, Response } from "express";
import { getAllProductService } from "../../services/products/getAllProductService";

export const getAllProductController = async (req: Request, res: Response) => {
    try {
        const result = await getAllProductService();
        const response = result.map(item => ({
            product_id: item.productId,
            name: item.nama,
            description: item.description,
            price: item.price,
            brand: item.brand,
            category: item.category,
            quantity: item.quantity,
            images: item.images.map(item => ({
                img_id: item.imgId,
                color: item.color,
                colorCode: item.colorCode,
                img_url: item.url,
            })),
            review: item.review.map(item => ({
                reviewId: item.reviewId,
                comment: item.comment,
                rating: item.rating,
                user: {
                    userId: item.users.userId,
                    nama: item.users.nama,
                    email: item.users.email
                }
            }))
        }));
        res.json({ data: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};