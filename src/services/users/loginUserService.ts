import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import prisma from "../../lib/prisma";

export const loginUserService = async (userData: {
    email: string,
    password: string
}) => {
    try {
        const { email, password } = userData;
        if (!email || !password) {
            throw new Error('Email dan password diperlukan.');
        }
        const result = await prisma.users.findUnique({
            where: { email },
        });
        if (!result) {
            throw new Error('Email atau password salah.');
        }
        const passwordMatch = await bcrypt.compare(password, result.password);
        if (!passwordMatch) {
            throw new Error('Email atau password salah.');
        }
        dotenv.config();
        const token = jwt.sign({ userId: result.userId }, process.env.JWT_SECRET || "", {
            expiresIn: '12h',
        });
        return token;
    } catch (error) {
        throw error;
    }
}