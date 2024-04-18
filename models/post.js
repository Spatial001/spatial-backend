import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: () => new Date(),
        immutable: true,
    },
    msg: { type: String, required: true },
    comments: { type: Array, default: [] },
    userID: { type: String, required: true },
    topID: { type: String, required: true },
    topType: { type: String, default: "comment" },
    upvotes: { type: Array, default: [] },
    downvotes: { type: Array, default: [] }
})


const postSchema = mongoose.Schema({
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
        immutable: true,
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    upvotes: { type: Array, default: [] },
    downvotes: { type: Array, default: [] },
    userID: { type: String, required: true },
    comments: {
        type: Array,
        default: []
    }

})

export const cmt = mongoose.model("comment", commentSchema)

postSchema.index({ location: '2dsphere' })

export default mongoose.model("Post", postSchema)
