import prisma from "../../lib/prisma";

export const getProductBySearchService = async (keyword: any) => {
    let searchData;
    if (keyword) {
        searchData = await prisma.products.findMany({
            where: {
                OR: [
                    { nama: { contains: keyword } },
                    { description: { contains: keyword } },
                    { brand: { contains: keyword } }
                ]
            }
        });
    } else {
        throw new Error('Missing search criteria');
    }
    return searchData;
}