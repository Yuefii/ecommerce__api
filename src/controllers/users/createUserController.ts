import { Request, Response } from "express";
import { createUserService } from "../../services/users/createUserService";

export const createUserController = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        if (!userData) {
            res.status(401).json({ error: "email or password required." })
        }
        const result = await createUserService(userData);
        res.status(200).json({
            message: "successfully",
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};