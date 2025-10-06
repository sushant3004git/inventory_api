import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();
app.use(express.json());

// --- Routes and Middleware ---
app.use("/api/products", productRoutes);
app.use(notFound);
app.use(errorHandler);

// We export the app blueprint, NOT a running server
export default app;
