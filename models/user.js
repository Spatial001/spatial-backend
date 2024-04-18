import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String, },
    createdAt: {
        type: Date,
        default: () => new Date(),
    },
    savedPosts: { type: Array, default: [] },
    savedComments: { type: Array, default: [] }
})

export default mongoose.model("User", userSchema)