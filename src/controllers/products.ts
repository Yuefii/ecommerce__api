import { createProductController } from "./products/createProductController";
import { deleteProductController } from "./products/deleteProductController";
import { getAllProductController } from "./products/getAllProductController";
import { getProductByCategoryController } from "./products/getProductByCategoryController";
import { getProductByProductIdController } from "./products/getProductByProductIdController";
import { getProductBySearchController } from "./products/getProductBySearchController";
import { updateProductController } from "./products/updateProductController";

export const products = {
    getAllProductController,
    getProductByProductIdController,
    getProductBySearchController,
    getProductByCategoryController,
    createProductController,
    updateProductController,
    deleteProductController
}