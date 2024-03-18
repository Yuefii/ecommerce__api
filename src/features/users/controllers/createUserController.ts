import { Request, Response } from "express";
import { createUserService } from "../services/createUserService";

export const createUserController = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        if (!userData) {
            res.status(401).json({ error: "email or password required." })
        }
        const result = await createUserService(userData);
        const response = {
            user_id: result.userId,
            name: result.nama,
            email: result.email,
            address: result.alamat,
            phone_number: result.no_telp
        }
        res.status(200).json({
            message: "successfully",
            data: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};