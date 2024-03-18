import { Request, Response } from "express";
import { getProductBySearchService } from "../services/getProductBySearchService";

export const getProductBySearchController = async (req: Request, res: Response) => {
    try {
        let keyword: string | undefined = req.query.q?.toString();
        if (keyword && typeof keyword === 'string') {
            keyword = keyword.toLowerCase();
        } else {
            return res.status(400).json({ error: 'Invalid search keyword' });
        }
        const searchData = await getProductBySearchService(keyword);
        const response = searchData.map(item => ({
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
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ error: 'product not found' });
    }
};