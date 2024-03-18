import { createOrderController } from "./controllers/createOrderController";
import { deleteOrderController } from "./controllers/deleteOrderController";
import { getAllOrderController } from "./controllers/getAllOrderController";
import { getOrderByOrderIdController } from "./controllers/getOrderByOrderIdController";
import { updateOrderController } from "./controllers/updateOrderController";

export const orders = {
    createOrderController,
    getAllOrderController,
    getOrderByOrderIdController,
    updateOrderController,
    deleteOrderController
}