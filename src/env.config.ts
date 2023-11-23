import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const envConfig = {
	port: 5000,
	mongo_uri: process.env.MONGO_URI,
};
