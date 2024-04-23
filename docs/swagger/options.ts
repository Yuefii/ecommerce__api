import swaggerJsdoc from "swagger-jsdoc";

import { 
    getAllProducts, 
    getProductById, 
    getProductBySearch 
} from "./paths/products"
import { detailSchemas } from "./components"

export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "ECOMMERCE API",
            version: "1.0.0",
            description: "I created this api to collaborate with my friend in building an ecommerce website project.",
            contact: {
                name: "yuefii",
                url: "https://github.com/Yuefii",
            }
        },
        servers: [
            {
                url: "http://localhost:8080/"
            }
        ],

        paths: {
            "/v1/products": getAllProducts,
            "/v1/products/{productId}": getProductById,
            "/v1/products/search": getProductBySearch
        },
        components: {
            schemas: detailSchemas
        }
    },
    apis: ["./router.ts"]
};

swaggerJsdoc(options);
