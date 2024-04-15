import { changePasswordController } from "./controllers/changePasswordController";
import { createUserController } from "./controllers/createUserController";
import { deleteUserController } from "./controllers/deleteUserController";
import { getAllUsersController } from "./controllers/getAllUserController";
import { getUserByUserIdController } from "./controllers/getUserByUserIdController";
import { loginUserController } from "./controllers/loginUserController";
import { updateUserController } from "./controllers/updateUserController";
import { uploadImageUserController } from "./controllers/uploadImageUserController";

export const users = {
    getAllUsersController,
    getUserByUserIdController,
    loginUserController,
    createUserController,
    updateUserController,
    uploadImageUserController,
    changePasswordController,
    deleteUserController
}