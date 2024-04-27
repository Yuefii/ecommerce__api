import swaggerJsdoc from "swagger-jsdoc";

import {
    getAllProducts,
    getProductById,
    getProductBySearch
} from "./paths/products"
import {
    loginUser,
    createUser,
    getAllUsers,
    getUserById,
} from "./paths/users"
import {
    createDiscus,
    deleteDiscus,
    createReplyDiscus,
    getDiscusByProductId,
} from "./paths/discus"
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
            "/v1/products/search": getProductBySearch,
            "/v1/users/register": createUser,
            "/v1/users/login": loginUser,
            "/v1/users": getAllUsers,
            "/v1/users/{userId}": getUserById,
            // discus
            "/v1/products/{productId}/discus": getDiscusByProductId,
            "/v1/products/{productId}/discus/{userId}": createDiscus,
            "/v1/products/{discusId}/discus/{userId}/reply": createReplyDiscus,
            "/v1/products/discus/{discusId}/delete": deleteDiscus,
        },
        components: {
            schemas: detailSchemas
        }
    },
    apis: ["./router.ts"],
};

swaggerJsdoc(options);
