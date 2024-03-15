import { Request, Response } from "express";
import { getProductBySearchService } from "../../services/products/getProductBySearchService";

export const getProductBySearchController = async (req: Request, res: Response) => {
    const { keyword } = req.query;
    try {
        const searchData = await getProductBySearchService(keyword);
        res.status(200).json(searchData);
    } catch (error) {
        res.status(500).json({ error: 'product not found' });
    }
};