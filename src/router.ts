import express from 'express';
import {
    createUserController,
    deleteUserController,
    getUserByIdController,
    getUsersController,
    updateUserController
} from './controllers/users.controller';
import {
    createProductController,
    deleteProductController,
    getProductByIdController,
    getProductController,
    updateProductController
} from './controllers/products.controller';

export const router = express.Router()

router.post('/v1/users/register', createUserController);
router.get('/v1/users', getUsersController);
router.get('/v1/users/:userId', getUserByIdController);
router.patch('/v1/users/:userId/update', updateUserController);
router.delete('/v1/users/:userId/delete', deleteUserController);

router.post('/v1/products', createProductController)
router.get('/v1/products', getProductController)
router.get('/v1/products/:productId', getProductByIdController)
router.patch('/v1/products/:productId/update', updateProductController);
router.delete('/v1/products/:productId/delete', deleteProductController);