import { Model, DataTypes } from "sequelize";
import db from "../../db";

class UserRoles extends Model {
  id: number;
  user_id: number;
  roles: Array<string>;
}

UserRoles.init(
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
    timestamps: false,
  }
);

export default UserRoles;
