import { Request, Response } from "express";
import { getUserByUserIdService } from "../services/getUserByUserIdService";

export const getUserByUserIdController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const result = await getUserByUserIdService(userId);
        if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }
        const response = {
            user_id: result.userId,
            name: result.nama,
            email: result.email,
            address: result.alamat,
            phone_number: result.no_telp
        }
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};