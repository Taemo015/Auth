import { Model, DataTypes } from "sequelize";
import UserRoles from "./user_roles";
import db from "../db";

class UserModel extends Model {
  id: number;
  email: string;
  nickname: string;
  password: string;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "users",
  }
);

UserModel.hasMany(UserRoles, { as: "roles", foreignKey: "user_id" });
export default UserModel;
