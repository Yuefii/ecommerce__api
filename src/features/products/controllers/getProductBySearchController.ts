import { Request, Response } from "express";
import { getProductBySearchService } from "../services/getProductBySearchService";
import { ProductDTO } from "../../../dto/ProductDto";

export const getProductBySearchController = async (req: Request, res: Response) => {
    try {
        let keyword: string | undefined = req.query.q?.toString();
        let limit: number = req.query.limit ? parseInt(req.query.limit.toString()) : 10;
        if (keyword && typeof keyword === 'string') {
            keyword = keyword.toLowerCase();
        } else {
            return res.status(400).json({ error: 'Invalid search keyword' });
        }
        const searchData = await getProductBySearchService(keyword, limit);
        const response = searchData.map(ProductDTO);
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ error: 'product not found' });
    }
};