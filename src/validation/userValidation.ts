import { Request, Response } from "express";
import { userLoginSchema, userRegisterSchema, userUpdateSchema } from "./schema/userShema";
import { parseZodError } from "../error/zodError";

export const validateUserRegister = (req: Request, res: Response, next: () => void) => {
    try {
        userRegisterSchema.parse(req.body);
        next();
    } catch (error: any) {
        console.error(error);
        const errorMessage = parseZodError(error.errors);
        res.status(400).json({ error: errorMessage });
    }
};
export const validateUserLogin = (req: Request, res: Response, next: () => void) => {
    try {
        userLoginSchema.parse(req.body);
        next();
    } catch (error: any) {
        console.error(error);
        const errorMessage = parseZodError(error.errors);
        res.status(400).json({ error: errorMessage });
    }
};
export const validateUserUpdate = (req: Request, res: Response, next: () => void) => {
    try {
        userUpdateSchema.parse(req.body);
        next();
    } catch (error: any) {
        console.error(error);
        const errorMessage = parseZodError(error.errors);
        res.status(400).json({ error: errorMessage });
    }
};