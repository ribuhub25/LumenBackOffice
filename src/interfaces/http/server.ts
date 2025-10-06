const express = require("express");
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes"

const app = express();
app.use(express.json());

app.use("/api", productRoutes);
app.use("/api/auth", authRoutes);

export default app;
