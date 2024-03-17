import { createOrderController } from "./orders/createOrderController";
import { deleteOrderController } from "./orders/deleteORderController";
import { getAllOrderController } from "./orders/getAllOrderController";
import { getOrderByOrderIdController } from "./orders/getOrderByOrderIdController";
import { updateOrderController } from "./orders/updateOrderController";

export const orders = {
    createOrderController,
    getAllOrderController,
    getOrderByOrderIdController,
    updateOrderController,
    deleteOrderController
}