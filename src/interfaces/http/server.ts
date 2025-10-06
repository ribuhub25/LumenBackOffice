const express = require("express");
import productRoutes from "./routes/productRoutes";

const app = express();
app.use(express.json());

app.use("/api", productRoutes);

export default app;
