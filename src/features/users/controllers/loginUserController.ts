import { Request, Response } from "express";
import { loginUserService } from "../services/loginUserService";

export const loginUserController = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const token = await loginUserService(userData);
        res.status(200).json({
            message: "successfully",
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}