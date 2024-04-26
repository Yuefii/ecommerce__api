import { Request, Response } from "express";
import { deleteDiscusService } from "../services/deleteDiscusService";

export const deleteDiscusController = async (req: Request, res: Response) => {
    try {
        const discusId = req.params.discusId
        await deleteDiscusService(discusId)
        res.status(200).json({ message: 'discus deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};