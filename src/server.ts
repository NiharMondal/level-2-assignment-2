import app from "./app";
import mongoose from "mongoose";
import { envConfig } from "./env.config";

const port = envConfig.port || 7000;

(async function server() {
	await mongoose.connect(envConfig.mongo_uri as string);
	app.listen(port, () => {
		console.log(
			`App listening on port ${port} \nMongoDB connected successfylly`
		);
	});
})();
