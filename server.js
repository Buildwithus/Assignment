import dotenv from "dotenv";
import app from "./app.js";
import  {pool, testConnection } from "./src/config/db.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
let server;

const startServer = async () => {
  try {
    await testConnection();
    server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error?.message);
    process.exit(1);
  }
};
startServer();
const shutdown = async () => {
  console.log("Shutting down server...");

  try {
    if (server) {
      server.close(() => {
        console.log("Server closed");
      });
    }
    await pool.end();
    console.log("pool closed");
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error.message);
    process.exit(1);
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  shutdown();
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  shutdown();
});
