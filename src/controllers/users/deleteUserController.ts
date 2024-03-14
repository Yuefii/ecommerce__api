import { Request, Response } from "express";
import { deleteUserService } from "../../services/users/deleteUserService";

export const deleteUserController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        await deleteUserService(userId);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};