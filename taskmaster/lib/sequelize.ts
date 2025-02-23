import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!, {
  host: process.env.DB_HOST!,
  dialect: "mysql",
  logging: false, // Set to true if you want SQL logs in the console
});

export default sequelize;
