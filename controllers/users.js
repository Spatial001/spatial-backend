import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import dotenv from 'dotenv'
dotenv.config();
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password)
            return res.status(400).json({ message: "Incomplete request" })
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesnt exist" })
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: "invalid credentials" })
        const token = jwt.sign({ email: existingUser, id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: "1h" })
        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}
export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!email || !password || !name)
            return res.status(400).json({ message: "Incomplete request" })
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: "User already exists" })
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({ email, password: hashedPassword, name })
        const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY, { expiresIn: "1h" })
        res.status(200).json({ result, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}