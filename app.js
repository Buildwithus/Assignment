import express from "express";
import cors from "cors";
import helmet from "helmet";
import globalRouter from "./src/routes/route.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";
import { swaggerDocs } from "./src/config/swagger.js";
const app = express();
app.use(helmet());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
swaggerDocs(app);
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    environment: process.env.NODE_ENV,
  });
});

app.use("/api", globalRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);

export default app;
