import prisma from "../../../libs/prisma";

export const updateUserService = async (userId: string, userData: {
    nama: string,
    email: string,
    alamat: string,
    no_telp: string
}) => {
    try {
        const {
            nama,
            email,
            alamat,
            no_telp
        } = userData;
        const result = await prisma.users.update({
            where: {
                userId: userId,
            },
            data: {
                nama,
                email,
                alamat,
                no_telp
            },
        });
        return result;
    } catch (error) {
        throw error;
    }
};