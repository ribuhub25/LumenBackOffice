const express = require("express");
const cors = require('cors');

import productRoutes from "./routes/productRoutes";
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Si usas cookies o autenticación
}));

app.use(express.json());

app.use("/api", productRoutes);

export default app;
