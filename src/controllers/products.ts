import { createProductController } from "./products/createProductController";
import { deleteProductController } from "./products/deleteProductController";
import { getAllProductController } from "./products/getAllProductController";
import { getProductByProductIdController } from "./products/getProductByProductIdController";
import { updateProductController } from "./products/updateProductController";

export const products = {
    getAllProductController,
    getProductByProductIdController,
    createProductController,
    updateProductController,
    deleteProductController
}