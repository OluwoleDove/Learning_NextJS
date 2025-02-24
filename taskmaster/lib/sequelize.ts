import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Ensure required environment variables are set
if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASS) {
  console.error("Missing database environment variables.");
  process.exit(1);
}

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql", // Ensure it's MySQL
    logging: console.log, // Log queries for debugging
  }
);

// Test database connection
const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
    console.log("Sequelize is using dialect:", sequelize.getDialect());
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

// Auto-sync database
const autoSyncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Adjusts table structures if needed
    console.log("Database synchronized.");
  } catch (error) {
    console.error("Database sync failed:", error);
  }
};

// Run tests and sync on startup
(async () => {
  await testDBConnection();
  await autoSyncDatabase();
})();

// Export sequelize instance
export default sequelize;
