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
        const userId = req.params.userId;
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

export const deleteUserController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        await deleteUserService(userId);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};