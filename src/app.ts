import express, { Application, Request, Response } from "express";
import cors from "cors";
//import routes

import { userRouter } from "./modules/users/user-routes";
const app: Application = express();

app.use(express.json());
app.use(cors());

//root route
app.use("/", (req: Request, res: Response) => {
	res.json({ success: true, message: "Welcome to the home page" });
});

//use routes
app.use("/api/users", userRouter);

export default app;
