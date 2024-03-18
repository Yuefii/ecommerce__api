import { createUserController } from "./controllers/createUserController";
import { deleteUserController } from "./controllers/deleteUserController";
import { getAllUsersController } from "./controllers/getAllUserController";
import { getUserByUserIdController } from "./controllers/getUserByUserIdController";
import { loginUserController } from "./controllers/loginUserController";
import { updateUserController } from "./controllers/updateUserController";

export const users = {
    getAllUsersController,
    getUserByUserIdController,
    loginUserController,
    createUserController,
    updateUserController,
    deleteUserController
}