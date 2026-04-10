import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/categories.routes";
import productRoutes from "./routes/products";
import comboRoutes from "./routes/combos.routes";

const app = express();
app.use(cors());
app.use(express.json());

// Rota básica só pra testar
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

app.use("/auth", authRoutes);
app.use("/categorias", categoryRoutes);
app.use("/produtos", productRoutes);
app.use("/combos", comboRoutes);

app.listen(3000, () => {
  console.log("Backend rodando na porta 3000");
});
