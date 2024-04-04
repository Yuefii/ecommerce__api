import bcrypt from "bcrypt"
import prisma from "../../../libs/prisma";
import { ResponseError } from "../../../error/responseError";

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
        const existingUser = await prisma.users.findUnique({
            where: {
                email: email
            }
        });
        if (existingUser) {
            throw new ResponseError("Email already use.", 401);
        }
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