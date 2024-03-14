import { createUserController } from "./users/createUserController";
import { deleteUserController } from "./users/deleteUserController";
import { getAllUsersController } from "./users/getAllUserController";
import { getUserByUserIdController } from "./users/getUserByUserIdController";
import { loginUserController } from "./users/loginUserController";
import { updateUserController } from "./users/updateUserController";

export const users = {
    getAllUsersController,
    getUserByUserIdController,
    loginUserController,
    createUserController,
    updateUserController,
    deleteUserController
}