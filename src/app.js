import express from "express";
import connectDB from "./mongoose.js";
import router from "./routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
connectDB();

export default app;
