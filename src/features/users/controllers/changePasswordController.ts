import { Request, Response } from "express";
import { changePasswordService } from "../services/changePasswordService";
import { ResponseError } from "../../../error/responseError";

export const changePasswordController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const userData = req.body;

        await changePasswordService(userId, userData);
        res.json({
            message: "successfuly",
            statusCode: 200,
        });
    } catch (error) {
        console.error(error);
        if (error instanceof ResponseError) {
            res.status(error.statusCode).json({
                statusCode: error.statusCode,
                error: error.message
            });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};