import { Request, Response } from "express";
import { updateUserService } from "../services/updateUserService";
import { UserDTO } from "../../../dto/UserDto";

export const updateUserController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const userData = req.body;
        const user = await updateUserService(userId, userData);
        const response = UserDTO(user)
        res.json({
            message: "successfully",
            updated: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};