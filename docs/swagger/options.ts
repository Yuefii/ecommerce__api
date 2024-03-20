import swaggerJsdoc from "swagger-jsdoc";

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
            "/v1/products": {
                get: {
                    tags: ["Products"],
                    summary: "get all products",
                    responses: {
                        200: {
                            description: "Successful operation",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: '#/components/schemas/ProductList'
                                    }
                                }
                            }
                        }
                    }
                },
            },
            "/v1/products/{productId}": {
                get: {
                    tags: ["Products"],
                    summary: "get product by productId",
                    parameters: [
                        {
                            name: "productId",
                            in: "path",
                            description: "ID of product to return",
                            required: true,
                            schema: {
                                type: "string"
                            }
                        }
                    ],
                    responses: {
                        200: {
                            description: "Successful operation"
                        }
                    }
                },
            },
            "/v1/products/search": {
                get: {
                    tags: ["Products"],
                    summary: "search products",
                    parameters: [
                        {
                            name: "q",
                            in: "query",
                            description: "Keyword for product search",
                            required: true,
                            schema: {
                                type: "string"
                            }
                        },
                        {
                            name: "limit",
                            in: "query",
                            description: "Maximum number of products to return",
                            required: false,
                            schema: {
                                type: "integer",
                                default: 10
                            }
                        }
                    ],
                    responses: {
                        200: {
                            description: "Successful operation",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: '#/components/schemas/ProductList'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        components: {
            schemas: {
                ProductList: {
                    type: "object",
                    properties: {
                        pagination: {
                            type: "object",
                            properties: {
                                total_products: { type: "integer" },
                                current_page: { type: "integer" },
                                total_pages: { type: "integer" }
                            }
                        },
                        data: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Product" }
                        }
                    }
                },
                Product: {
                    type: "object",
                    properties: {
                        product_id: { type: "string" },
                        name: { type: "string" },
                        description: { type: "string" },
                        price: { type: "number" },
                        brand: { type: "string" },
                        category: { type: "string" },
                        quantity: { type: "integer" },
                        images: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Image" }
                        },
                        owner: {
                            type: "object",
                            properties: {
                                owner_id: { type: "string" },
                                name: { type: "string" },
                                email: { type: "string" }
                            }
                        },
                        review: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Review" }
                        }
                    }
                },
                Image: {
                    type: "object",
                    properties: {
                        img_id: { type: "string" },
                        color: { type: "string" },
                        colorCode: { type: "string" },
                        img_url: { type: "string" }
                    }
                },
                Review: {
                    type: "object",
                    properties: {
                        review_id: { type: "string" },
                        comment: { type: "string" },
                        rating: { type: "integer" },
                        user: {
                            type: "object",
                            properties: {
                                user_id: { type: "string" },
                                name: { type: "string" },
                                email: { type: "string" }
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ["./router.ts"]
};

const specs = swaggerJsdoc(options);
