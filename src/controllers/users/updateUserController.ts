import { Request, Response } from "express";
import { updateUserService } from "../../services/users/updateUserService";

export const updateUserController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const userData = req.body;
        const user = await updateUserService(userId, userData);
        res.json({
            message: "successfully",
            updated: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};