import prisma from "../../lib/prisma";

export const getProductByCategoryService = async (keyword: any) => {
    let searchData;
    if (keyword) {
        searchData = await prisma.products.findMany({
            where: {
                OR: [
                    { category: { contains: keyword } },
                ]
            }
        });
    } else {
        throw new Error('Missing search criteria');
    }
    return searchData;
}