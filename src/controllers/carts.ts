import { createCartController } from "./carts/createCartController";
import { deleteCartController } from "./carts/deleteCartController";
import { getAllCartController } from "./carts/getAllCartController";
import { getCartByCartIdController } from "./carts/getCartByCartIdController";
import { updateCartController } from "./carts/updateCartController";

export const carts = {
    createCartController,
    getAllCartController,
    getCartByCartIdController,
    updateCartController,
    deleteCartController
}