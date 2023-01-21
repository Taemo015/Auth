import { Model, DataTypes } from "sequelize";
import db from "../../db";
import UserRoles from "./UserRoles";

class UserModel extends Model {
  id: number;
  nickname: string;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    auth_id: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "users",
    timestamps: false,
  }
);

UserModel.hasMany(UserRoles, { as: "roles", foreignKey: "user_id" });
export default UserModel;
