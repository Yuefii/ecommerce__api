import { Request, Response } from "express";
import {
    createUserService,
    deleteUserService,
    getUserByIdService,
    getUsersService,
    updateUserService
} from "../services/users.services"

export const createUserController = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
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

export const getUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getUsersService();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getUserByIdController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await getUserByIdService(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateUserController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const user = await updateUserService(userId, userData);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteUserController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        await deleteUserService(userId);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};