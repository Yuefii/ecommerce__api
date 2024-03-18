import { Request, Response } from "express";
import { updateUserService } from "../services/updateUserService";

export const updateUserController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const userData = req.body;
        const result = await updateUserService(userId, userData);
        const response = {
            user_id: result.userId,
            name: result.nama,
            email: result.email,
            address: result.alamat,
            phone_number: result.no_telp
        }
        res.json({
            message: "successfully",
            updated: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};