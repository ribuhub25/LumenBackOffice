const express = require("express");
const cors = require('cors');

import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import brandRoutes from "./routes/brandRoutes";
import filterRoutes from "./routes/filterRoutes";
import categoryRoutes from "./routes/categoryRoutes";

const app = express();

app.use(cors({
  origin: ['http://localhost:5173','http://localhost:5174'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Si usas cookies o autenticación
}));


app.use("/api/products", productRoutes);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/filter", filterRoutes);
app.use("/api/brands",brandRoutes);
app.use("/api/categories",categoryRoutes);

export default app;
