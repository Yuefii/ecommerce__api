import prisma from "../lib/prisma";
import bcrypt from "bcrypt"

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

export const getUsersService = async () => {
    try {
        const users = await prisma.users.findMany();
        return users;
    } catch (error) {
        throw error;
    }
};

export const getUserByIdService = async (userId: string) => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                userId: userId,
            },
        });
        return user;
    } catch (error) {
        throw error;
    }
};

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
        const user = await prisma.users.update({
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
        return user;
    } catch (error) {
        throw error;
    }
};

export const deleteUserService = async (userId: string) => {
    try {
        await prisma.users.delete({
            where: {
                userId: userId,
            },
        });
    } catch (error) {
        throw error;
    }
};