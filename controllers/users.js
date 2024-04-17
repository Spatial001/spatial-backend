import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import dotenv from 'dotenv'
dotenv.config();
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist" })
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: "invalid credentials" })
        const token = jwt.sign({ user: existingUser, id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_LIFETIME })
        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}
export const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: "User already exists" })
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({ email, password: hashedPassword })
        const token = jwt.sign({ user: result, id: result._id }, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_LIFETIME })
        res.status(200).json({ result, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const home = (req, res) => {

    try {
        const existingUser = User.findOne({ email: req.decoded?.email });
        if (!existingUser) return res.status(404).json({ message: "User doesnt exist" })
        return res.status(200).send("authenticated")
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}