import { DataTypes } from "sequelize";
import sequelize from "@lib/sequelize";

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Task;
