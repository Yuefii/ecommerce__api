import { Request, Response } from "express";
import { getAllProductService } from "../services/getAllProductService";
import { getTotalProducts } from "../../../utils/totalProducts";

export const getAllProductController = async (req: Request, res: Response) => {
    let { page = 1, limit = 10 } = req.query;
    try {
        page = typeof page === 'string' ? page : '1';
        limit = typeof limit === 'string' ? limit : '10';

        const totalProducts = await getTotalProducts();
        const offset = (parseInt(page) - 1) * parseInt(limit);
        const result = await getAllProductService(offset, parseInt(limit));
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
                review_id: item.reviewId,
                comment: item.comment,
                rating: item.rating,
                user: {
                    user_id: item.users.userId,
                    name: item.users.nama,
                    email: item.users.email
                }
            }))
        }));
        res.json({
            pagination: {
                total_products: totalProducts,
                current_pages: parseInt(page),
                total_pages: Math.ceil(totalProducts / parseInt(limit)),
            },
            data: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};