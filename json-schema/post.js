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

        },
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

        }, lim: {
            type: "number",
            minimum: 1,
            maximum: 10
        },
        skipTo: {
            type: "number",
            minimum: 0
        }
    }
}
export const comment = {
    type: "object",
    required: ["msg", "postID"],
    properties: {
        msg: {
            type: "string",
            minLength: 1
        },
        postID: {
            type: "string",
            pattern: "^[a-z0-9]{24}$"
        }
    }
}

export const reply = {
    type: "object",
    required: ["msg", "commentID"],
    properties: {
        msg: {
            type: "string",
            minLength: 1
        },
        commentID: {
            type: "string",
            pattern: "^[a-z0-9]{24}$"
        }
    }
}

export const getComments = {
    type: "object",
    required: ["comments"],
    properties: {
        comments: {
            type: "array",
            minItems: 1,
            items: {
                type: "string",
                pattern: "^[a-z0-9]{24}$"
            }

        }
    }
}

export const delComment = {
    type: "object",
    required: ["commentID"],
    properties: {
        commentID: {
            type: "string",
            pattern: "^[a-z0-9]{24}$"
        }
    }
}

export const vote = {
    type: "object",
    required: ["voteID"],
    properties: {
        voteID: {
            type: "string",
            pattern: "^[a-z0-9]{24}$"
        }
    }
}

export const savePostSchema = {
    type: "object",
    required: ["postID"],
    properties: {
        postID: {
            type: "string",
            pattern: "^[a-z0-9]{24}$"
        }
    }
}

export const getPostsSchema = {
    type: "object",
    required: ["postIDS"],
    properties: {
        postIDS: {
            type: "array",
            minItems: 1,
            items: {
                type: "string",
                pattern: "^[a-z0-9]{24}$"
            }

        },
        lim: {
            type: "number",
            minimum: 1,
            maximum: 10
        },
        skipTo: {
            type: "number",
            minimum: 0
        }
    }
}

export const save = {
    type: "object",
    required: ["id"],
    properties: {
        id: {
            type: "string",
            pattern: "^[a-z0-9]{24}$"
        }
    }
}