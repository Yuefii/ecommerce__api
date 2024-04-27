export const discusInput = {
    type: "object",
    properties: {
        message: {
            type: "string"
        },
        discusType: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string"
                    }
                },
                required: ["name"]
            }
        }
    },
    required: [
        "message",
        "discusType"
    ]
};

export const discusReplyInput = {
    type: "object",
    properties: {
        message: {
            type: "string"
        }
    },
    required: [
        "message"
    ]
};

export const discusResponse = {
    type: "object",
    properties: {
        message:
            { type: "string" },
        data:
        {
            type: "object",
            properties: {
                discus_id:
                    { type: "string" },
                user_id:
                    { type: "string" },
                discus_message:
                    { type: "string" },
                discus_type: {
                    type: "object",
                    properties: {
                        name:
                            { type: "string" }
                    }
                },
                discus_reply: {
                    type: "object",
                    properties: {
                        discus_id:
                            { type: "string" },
                        reply_id:
                            { type: "string" },
                        user_id:
                            { type: "string" },
                        reply_message:
                            { type: "string" },
                        created_at:
                            { type: "string" }
                    }
                },
                created_at:
                    { type: "string" }
            },
        }
    },
}
export const discusReplyResponse = {
    type: "object",
    properties: {
        message:
            { type: "string" },
        data:
        {
            type: "object",
            properties: {
                reply_id:
                    { type: "string" },
                discus_id:
                    { type: "string" },
                user_id:
                    { type: "string" },
                message:
                    { type: "string" },
                created_at:
                    { type: "string" }
            }
        }
    },
}