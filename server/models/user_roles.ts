import { Model, DataTypes } from "sequelize";
import db from "../db";

class RolesModel extends Model {}

RolesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    sequelize: db,
    tableName: "roles",
  }
);

export default RolesModel;
