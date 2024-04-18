import mongoose from "mongoose";
import post, { cmt } from "../models/post.js";

export const createPost = async (req, res) => {

    const { coords, title, image } = req.body;
    if (!image) image = ""
    try {
        const p = { type: 'Point', coordinates: coords };
        const result = await post.create({ location: p, title, image, userID: req.decoded.id })
        res.status(200).json({ code: 200, post: result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}


export const getPosts = async (req, res) => {
    const { coords, minD, maxD, lim, skipTo } = req.body;
    const mindist = minD || 0;
    const maxDist = maxD || 20000;
    const numPosts = lim || 5;
    const skipPosts = skipTo || 0;
    try {
        const r = await post.find({
            location:
            {
                $near:
                {
                    $geometry: { type: "Point", coordinates: coords },
                    $minDistance: mindist,
                    $maxDistance: maxDist
                }
            }
        }).limit(numPosts).skip(skipPosts)
        return res.status(200).json({ code: 200, posts: r })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ code: 500, message: error })
    }

}

export const createCommentOnPost = async (req, res) => {
    const { postID, msg } = req.body
    try {
        const cPost = await post.findById(postID)
        if (!cPost) return res.status(404).json({ code: 404, message: "Post doesnt exist" })
        const comment = await cmt.create({ msg, userID: req.decoded.id, topID: postID, topType: "post" })
        cPost.comments.push(comment._id)
        const uPost = await post.findByIdAndUpdate(cPost._id, cPost, { new: true })
        return res.status(200).json({ code: 200, comment })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ code: 500, message: error })
    }
}

export const getAllComments = async (req, res) => {
    const { comments } = req.body
    try {
        var ids = []
        comments.forEach(function (item) {
            ids.push(new mongoose.Types.ObjectId(item))
        })
        const cmts = await cmt.find({ _id: { $in: ids } })
        return res.status(200).json({ code: 200, comments: cmts })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ code: 500, message: error })
    }

}

const _getAllPosts = async (_, res) => {
    return res.status(200).json(await post.find())
}

export const createReply = async (req, res) => {
    const { msg, commentID } = req.body
    try {
        const topCmt = await cmt.findById(commentID)
        if (!topCmt) return res.status(404).json({ code: 404, message: "Comment doesnt exist" })
        const reply = await cmt.create({ msg, userID: req.decoded.id, topID: commentID })
        topCmt.comments.push(reply._id)
        await cmt.findByIdAndUpdate(topCmt._id, topCmt)
        return res.status(200).json({ code: 200, reply })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ code: 500, message: error })
    }
}

export const editComment = async (req, res) => {
    const { msg, commentID } = req.body;
    try {
        const comment = req.comment
        comment.msg = msg;
        const updatedComment = await cmt.findByIdAndUpdate(commentID, comment, { new: true })
        return res.status(200).json({ code: 200, updatedComment })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ code: 500, message: error })
    }
}

export const delCommentController = async (req, res) => {
    const { commentID } = req.body;
    try {
        const comment = req.comment
        comment.msg = "Deleted"
        const updatedComment = await cmt.findByIdAndUpdate(commentID, comment, { new: true })
        return res.status(200).json({ code: 200, updatedComment })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ code: 500, message: error })
    }
}

// ----------------------VOTES---------------------------//


export const postUpvote = async (req, res) => {
    const userID = req.decoded.id
    const { voteID } = req.body
    try {
        const postUV = await post.findById(voteID)
        if (!postUV) return res.status(404).json({ code: 404, message: "Post doesn't exist" })
        if (!postUV.upvotes.includes(userID)) postUV.upvotes.push(userID)
        else postUV.upvotes = postUV.upvotes.filter(id => id != userID)

        postUV.downvotes = postUV.downvotes.filter(id => id != userID)

        const updatedPost = await post.findByIdAndUpdate(postUV._id, postUV, { new: true })

        return res.status(200).json({ code: 200, post: updatedPost })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ code: 500, message: error })
    }
}
export const postDownvote = async (req, res) => {
    const userID = req.decoded.id
    const { voteID } = req.body
    try {
        const postDV = await post.findById(voteID)
        if (!postDV) return res.status(404).json({ code: 404, message: "Post doesn't exist" })
        if (!postDV.downvotes.includes(userID)) postDV.downvotes.push(userID)
        else postDV.downvotes = postDV.downvotes.filter(id => id != userID)

        postDV.upvotes = postDV.upvotes.filter(id => id != userID)

        const updatedPost = await post.findByIdAndUpdate(postDV._id, postDV, { new: true })

        return res.status(200).json({ code: 200, post: updatedPost })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ code: 500, message: error })
    }
}
export const commentUpvote = async (req, res) => {
    const userID = req.decoded.id
    const { voteID } = req.body
    try {
        const commentUV = await cmt.findById(voteID)
        if (!commentUV) return res.status(404).json({ code: 404, message: "Comment doesn't exist" })
        if (!commentUV.upvotes.includes(userID)) commentUV.upvotes.push(userID)
        else commentUV.upvotes = commentUV.upvotes.filter(id => id != userID)

        commentUV.downvotes = commentUV.downvotes.filter(id => id != userID)

        const updatedPost = await cmt.findByIdAndUpdate(commentUV._id, commentUV, { new: true })

        return res.status(200).json({ code: 200, comment: updatedPost })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ code: 500, message: error })
    }
}
export const commentDownvote = async (req, res) => {
    const userID = req.decoded.id
    const { voteID } = req.body
    try {
        const commentDV = await cmt.findById(voteID)
        if (!commentDV) return res.status(404).json({ code: 404, message: "Comment doesn't exist" })
        if (!commentDV.downvotes.includes(userID)) commentDV.downvotes.push(userID)
        else commentDV.downvotes = commentDV.downvotes.filter(id => id != userID)

        commentDV.upvotes = commentDV.upvotes.filter(id => id != userID)

        const updatedPost = await cmt.findByIdAndUpdate(commentDV._id, commentDV, { new: true })

        return res.status(200).json({ code: 200, comment: updatedPost })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ code: 500, message: error })
    }
}

//-------------------------------------------------------------------------------------------//


export const getSavedPosts = async (req, res) => {
    const { postIDS, lim, skipTo } = req.body;
    const numPosts = lim || 5;
    const skipPosts = skipTo || 0;
    try {
        var ids = []
        postIDS.forEach(function (item) {
            ids.push(new mongoose.Types.ObjectId(item))
        })
        const posts = await post.find({ _id: { $in: ids } }).limit(numPosts).skip(skipPosts)
        return res.status(200).json({ code: 200, posts })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ code: 500, message: error })
    }
}