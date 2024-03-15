import { Request, Response } from "express";
import { getAllUsersService } from "../../services/users/getAllUserService";

export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const result = await getAllUsersService();
        const response = result.map((item => (
            {
                user_id: item.userId,
                name: item.nama,
                email: item.email,
                address: item.alamat,
                phone_number: item.no_telp
            }
        )))
        res.json({
            data: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};