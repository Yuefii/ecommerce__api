import prisma from "../lib/prisma";

export const createProductService = async (productData: {
    nama: string,
    description: string,
    price: number,
    brand: string,
    category: string,
    quantity: number,
    images: []
}) => {
    try {
        const {
            nama,
            description,
            price,
            brand,
            category,
            quantity,
            images
        } = productData;
        const result = await prisma.products.create({
            data: {
                nama,
                description,
                price,
                brand,
                category,
                quantity,
                images: {
                    createMany: {
                        data: images
                    }
                }
            },
            include: {
                images: true
            }
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const getProductService = async () => {
    try {
        const result = await prisma.products.findMany({
            include: {
                images: true
            },
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const getProductByIdService = async (productId: string) => {
    try {
        const result = await prisma.products.findUnique({
            where: {
                productId: productId,
            },
            include: {
                images: true
            }
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const updateProductService = async (productId: string, productData: {
    nama: string,
    description: string,
    price: number,
    brand: string,
    category: string,
    quantity: number,
    images: []
}) => {
    try {
        const {
            nama,
            description,
            price,
            brand,
            category,
            quantity,
            images
        } = productData;
        const result = await prisma.products.update({
            where: {
                productId: productId,
            },
            data: {
                nama,
                description,
                price,
                brand,
                category,
                quantity,
                images: {
                    deleteMany: {},
                    createMany: {
                        data: images,
                    },
                },
            },
            include: {
                images: true
            }
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const deleteProductService = async (productId: string) => {
    try {
        await prisma.products.delete({
            where: {
                productId: productId,
            },
        });
    } catch (error) {
        throw error;
    }
};