import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import dotenv from 'dotenv'
dotenv.config();
export const login = async (req, res) => {

    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ code: 404, message: "User doesn't exist" })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) return res.status(400).json({ code: 400, message: "invalid credentials" })

        const token = jwt.sign({ user: existingUser, id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_LIFETIME })
        res.status(200).json({ code: 200, result: existingUser, token })
    } catch (error) {
        res.status(500).json({ code: 500, message: "Something went wrong" })
    }

}

export const home = (req, res) => {


    try {
        const existingUser = User.findOne({ email: req.decoded?.email });
        if (!existingUser) return res.status(404).json({ code: 404, message: "User doesnt exist" })
        return res.status(200).send("authenticated")

    } catch (error) {
        console.log(error)
        res.status(500).json({ code: 500, message: "Something went wrong" })
    }

}

export const signup = async (req, res) => {

    const { email, password } = req.body;
    try {

        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ code: 400, message: "User already exists" })

        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({ email, password: hashedPassword })
        const token = jwt.sign({ user: result, id: result._id }, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_LIFETIME })
        res.status(200).json({ code: 200, result, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ code: 500, message: "Something went wrong" })
    }

}

export const savePost = async (req, res) => {
    const { id } = req.body;
    try {
        const usr = await User.findById(req.decoded.id)
        if (!usr) return res.status(404).json({ code: 404, message: "User doesn't exist" })
        if (!usr.savedPosts.includes(id)) usr.savedPosts.push(id)
        else usr.savedPosts = usr.savedPosts.filter(idU => idU != id)

        const upUsr = await User.findByIdAndUpdate(req.decoded.id, usr, { new: true })
        return res.status(200).json({ code: 200, savedPosts: upUsr.savedPosts })
    } catch (error) {
        console.log(error)
        res.status(500).json({ code: 500, message: "Something went wrong" })
    }
}

export const saveComment = async (req, res) => {
    const { id } = req.body;
    try {
        const usr = await User.findById(req.decoded.id)
        if (!usr) return res.status(404).json({ code: 404, message: "User doesn't exist" })
        if (!usr.savedComments.includes(id)) usr.savedComments.push(id)
        else usr.savedComments = usr.savedComments.filter(idU => idU != id)

        const upUsr = await User.findByIdAndUpdate(req.decoded.id, usr, { new: true })
        return res.status(200).json({ code: 200, savedComments: upUsr.savedComments })
    } catch (error) {
        console.log(error)
        res.status(500).json({ code: 500, message: "Something went wrong" })
    }
}