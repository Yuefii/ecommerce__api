import express from 'express';
import {
    createUserController,
    deleteUserController,
    getUserByIdController,
    getUsersController,
    updateUserController
} from './controllers/users.controller';

export const router = express.Router()

router.post('/v1/users/register', createUserController);
router.get('/v1/users', getUsersController);
router.get('/v1/users/:userId', getUserByIdController);
router.patch('/v1/users/:userId/update', updateUserController);
router.delete('/v1/users/:userId/delete', deleteUserController);

