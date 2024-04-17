import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const validation = async (error, req, res, next) => {
    try {
        if (error.validationErrors)
            return res.status(400).json({
                errors: error.validationErrors,
            });
        next();
    } catch (error) {
        console.log(error);
    }
};
export const jwtAuth = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (err) return res.status(401).send({ auth: false, err });
            req.decoded = decoded;
            next();
        });
    } catch (error) {
        console.log(error);
    }
}