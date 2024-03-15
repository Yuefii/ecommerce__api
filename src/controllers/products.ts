import { createProductController } from "./products/createProductController";
import { deleteProductController } from "./products/deleteProductController";
import { getAllProductController } from "./products/getAllProductController";
import { getProductByProductIdController } from "./products/getProductByProductIdController";
import { getProductBySearchController } from "./products/getProductBySearchController";
import { updateProductController } from "./products/updateProductController";

export const products = {
    getAllProductController,
    getProductByProductIdController,
    getProductBySearchController,
    createProductController,
    updateProductController,
    deleteProductController
}