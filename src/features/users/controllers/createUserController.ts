import { Request, Response } from "express";
import { createUserService } from "../services/createUserService";
import { UserDTO } from "../../../dto/UserDto";

export const createUserController = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        if (!userData) {
            res.status(401).json({ error: "email or password required." })
        }
        const user = await createUserService(userData);
        const response = UserDTO(user)
        res.status(200).json({
            message: "successfully",
            data: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};