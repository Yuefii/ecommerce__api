import { Request, Response } from "express";
import {
    createProductService,
    deleteProductService,
    getProductByIdService,
    getProductService,
    updateProductService
} from "../services/products.services";

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
            }))
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

export const getProductController = async (req: Request, res: Response) => {
    try {
        const result = await getProductService();
        const response = result.map(item => ({
            product_id: item.productId,
            nama: item.nama,
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
            }))
        }));
        res.json({ data: response });
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
        res.json({ data: response });
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
