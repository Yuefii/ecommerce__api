import { Request, Response } from "express";
import { getProductByCategoryService } from "../../services/products/getProductByCategoryService";

export const getProductByCategoryController = async (req: Request, res: Response) => {
    const  keyword = req.query.keyword;
    try {
        const searchData = await getProductByCategoryService(keyword);
        res.status(200).json(searchData);
    } catch (error) {
        res.status(500).json({ error: 'product not found' });
    }
};