import bcrypt from "bcrypt"
import prisma from "../../lib/prisma";

export const createUserService = async (userData: {
    nama: string,
    email: string,
    password: string,
    alamat: string,
    no_telp: string
}) => {
    try {
        const {
            nama,
            email,
            password,
            alamat,
            no_telp
        } = userData;
        const hashPassword = await bcrypt.hash(password, 12)
        const result = await prisma.users.create({
            data: {
                email,
                nama,
                password: hashPassword,
                alamat,
                no_telp
            },
        });
        return result;
    } catch (error) {
        throw error;
    }
};