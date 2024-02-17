import * as dotenv from "dotenv";
dotenv.config();

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "";

export { MONGO_CONNECTION_STRING };
