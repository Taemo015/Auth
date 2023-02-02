import { Sequelize } from "sequelize-typescript";
import { DB_PARAMS } from "./constants";

const sequelize = new Sequelize(
  process.env.DB_NAME || DB_PARAMS.DB_NAME,
  process.env.DB_USER || DB_PARAMS.DB_USER,
  process.env.DB_PASSWORD || DB_PARAMS.DB_PASSWORD,
  {
    dialect: DB_PARAMS.DB_USER,
    host: process.env.DB_HOST || DB_PARAMS.DB_HOST,
    port: 5432,
  }
);

export default sequelize;
