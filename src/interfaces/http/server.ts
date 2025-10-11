const express = require("express");
const cors = require('cors');

import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import brandRoutes from "./routes/brandRoutes";

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Si usas cookies o autenticación
}));

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/brands",brandRoutes);

export default app;
