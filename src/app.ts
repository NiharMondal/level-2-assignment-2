import express, { Application } from "express";
import cors from "cors";
//import routes

import { userRouter } from "./modules/users/user-routes";
const app: Application = express();

app.use(express.json());
app.use(cors());

//use routes
app.use("/api/users", userRouter);

export default app;
