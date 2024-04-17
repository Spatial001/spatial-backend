import mongoose from 'mongoose';
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
    votes: {
        type: Array,
        default: [],
    },
})
postSchema.index({ location: '2dsphere' })
export default mongoose.model("Post", postSchema)