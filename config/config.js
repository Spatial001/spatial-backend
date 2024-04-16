import dotenv from "dotenv"
dotenv.config();
const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
} = process.env;
const url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
export default url;