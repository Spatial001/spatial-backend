export const loginSchema = {
    type: "object",
    required: ["email", "password"],
    properties: {
        email: {
            type: "string",
            minLength: 3,
        },
        password: {
            type: "string",
            minLength: 3,
        },
    },
};
export const signupSchema = {
    type: "object",
    required: ["email", "password"],
    properties: {
        email: {
            type: "string",
            minLength: 3,
        },
        password: {
            type: "string",
            minLength: 3,
        },
    },
};
