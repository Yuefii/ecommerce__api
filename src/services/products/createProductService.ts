import prisma from "../../lib/prisma";

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