import { createProductController } from "./controllers/createProductController";
import { deleteProductController } from "./controllers/deleteProductController";
import { getAllProductController } from "./controllers/getAllProductController";
import { getProductByProductIdController } from "./controllers/getProductByProductIdController";
import { getProductBySearchController } from "./controllers/getProductBySearchController";
import { updateProductController } from "./controllers/updateProductController";

export const products = {
    getAllProductController,
    getProductByProductIdController,
    getProductBySearchController,
    createProductController,
    updateProductController,
    deleteProductController
}