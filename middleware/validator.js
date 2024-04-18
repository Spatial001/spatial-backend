import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const validation = async (error, req, res, next) => {
    try {
        if (error.validationErrors) {
            const msg = error.validationErrors.body[0].dataPath.slice(1) + " " + error.validationErrors.body[0].message
            return res.status(400).json(
                {
                    message: msg,
                    code: 400
                }
            );
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

export const jwtAuth = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (err) return res.status(401).send({ code: 401, message: err.message });
            req.decoded = decoded;
            next();
        });
    } catch (error) {
        console.log(error);
    }
}