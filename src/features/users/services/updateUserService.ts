import prisma from "../../../libs/prisma";

export const updateUserService = async (userId: string, userData: {
    nama: string,
    alamat: string,
    no_telp: string
}) => {
    try {
        const {
            nama,
            alamat,
            no_telp
        } = userData;
        const result = await prisma.users.update({
            where: {
                userId: userId,
            },
            data: {
                nama,
                alamat,
                no_telp
            },
        });
        return result;
    } catch (error) {
        throw error;
    }
};