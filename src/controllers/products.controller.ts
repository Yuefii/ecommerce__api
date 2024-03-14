import { Request, Response } from "express";
import { createProductService, deleteProductService, getProductByIdService, getProductService, updateProductService } from "../services/products.services";

export const createProductController = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        const result = await createProductService(productData);
        res.status(200).json({
            message: "successfully",
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getProductController = async (req: Request, res: Response) => {
    try {
        const result = await getProductService();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getProductByIdController = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        const result = await getProductByIdService(productId);
        if (!result) {
            return res.status(404).json({ error: 'product not found' });
        }
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateProductController = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        const productData = req.body;
        const result = await updateProductService(productId, productData);
        res.json({
            message: "successfully",
            updated: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteProductController = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        await deleteProductService(productId);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
