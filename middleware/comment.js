import { cmt } from "../models/post.js";

export const commentAuthorisation = async (req, res, next) => {
    const { commentID } = req.body
    try {
        const comment = await cmt.findById(commentID)
        if (!comment) return res.status(404).json({ code: 404, message: "Comment doesnt exist" })
        else {
            if (comment.userID == req.decoded.id) {
                req.comment = comment
                next();
            } else return res.status(403).json({ code: 403, message: "Unauthorised Action" })
        }

    } catch (error) {
        console.log(error);
    }
}