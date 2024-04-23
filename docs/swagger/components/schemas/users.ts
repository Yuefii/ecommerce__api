export const userInput = {
    type: "object",
    properties: {
        nama:
            { type: "string" },
        email:
            { type: "string" },
        password:
            { type: "string" }
    },
    required: [
        "nama",
        "email",
        "password"
    ]
}
export const userResponse = {
    type: "object",
    properties: {
        message:
            { type: "string" },
        statusCode:
            { type: "integer" },
        data:
            { $ref: "#/components/schemas/UserData" }
    },
    required: [
        "nama",
        "email",
        "password"
    ]
}
export const userData = {
    type: "object",
    properties: {
        user_id:
            { type: "string" },
        name:
            { type: "string" },
        email:
            { type: "string" },
        address:
            { type: "string" },
        phone_number:
            { type: "string" }
    },
    required: [
        "nama",
        "email",
        "password"
    ]
}

export const loginInput = {
    type: "object",
    properties: {
        email:
            { type: "string" },
        password:
            { type: "string" }
    },
    required: [
        "email",
        "password"
    ]
}

export const loginResponse = {
    type: "object",
    properties: {
        message:
            { type: "string" },
        statusCode:
            { type: "integer" },
        token:
            { type: "string" }
    }
}

export const usersList = {
    type: "object",
    properties: {
        data: {
            type: "array",
            items: { $ref: "#/components/schemas/UserDetails" }
        }
    }
}
export const userDetails = {
    type: "object",
    properties: {
        user_id: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
        address: { type: "string" },
        phone_number: { type: "string" },
        history_search: {
            type: "array",
            items: { $ref: "#/components/schemas/HistoryData" }
        },
        products: {
            type: "array",
            items: { $ref: "#/components/schemas/Product" }
        },
        review: {
            type: "array",
            items: { $ref: "#/components/schemas/Review" }
        }
    }
}

export const historyData = {
    type: "object",
    properties: {
        history_id:
            { type: "string" },
        title:
            { type: "string" },
        category:
            { type: "string" },
    },
}