export const post = {
    type: "object",
    required: ["title", "coords"],
    properties: {
        title: {
            type: "string",
            minLength: 3,
        },
        image: {
            type: "string",
            minLength: 50,
        },
        coords: {
            type: "array",
            maxItems: 2,
            minItems: 2,
            items: {
                type: "number"
            }
        }
    }
}
export const near = {
    type: "object",
    required: ["coords"],
    properties: {
        coords: {
            type: "array",
            maxItems: 2,
            minItems: 2,
            items: {
                type: "number"
            }
        }
    }
}