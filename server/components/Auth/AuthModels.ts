import { Model, DataTypes } from "sequelize";
import db from "../../db";
import UserModel from "../User/UserModel";

class AuthSchema extends Model {
  id: number;
  email: string;
  password: string;
}

const AuthModels = AuthSchema.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: db,
    tableName: "auth",
    timestamps: false,
  }
);

AuthModels.hasOne(UserModel, { as: "userData", foreignKey: "auth_id" });

export default AuthModels;
