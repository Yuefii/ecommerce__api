import { Request, Response } from "express";
import { getAllUsersService } from "../services/getAllUserService";
import { UserDetailDTO } from "../../../dto/UserDto";

export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const user = await getAllUsersService();
        const response = user.map(UserDetailDTO)
        res.status(200).json({
            data: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};