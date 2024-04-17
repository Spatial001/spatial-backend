export const loginSchema = {
    type: "object",
    required: ["email", "password"],
    properties: {
        email: {
            description: "Email of the user",
            type: "string",
            format: "email",
            pattern: "^\\S+@\\S+\\.\\S+$",
            minLength: 3
        },
        password: {
            type: "string",
            minLength: 3,
            pattern: "^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$"
        },
    },
};
export const signupSchema = {
    type: "object",
    required: ["email", "password"],
    properties: {
        email: {
            description: "Email of the user",
            type: "string",
            format: "email",
            pattern: "^\\S+@\\S+\\.\\S+$",
            minLength: 3
        },
        password: {
            type: "string",
            minLength: 3,
            pattern: "^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$"
        },
    },
};