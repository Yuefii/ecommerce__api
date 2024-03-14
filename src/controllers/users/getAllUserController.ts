import { Request, Response } from "express";
import { getAllUsersService } from "../../services/users/getAllUserService";

export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsersService();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};