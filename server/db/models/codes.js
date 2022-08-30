"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Codes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Codes.belongsTo(models.users, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  Codes.init(
    {
      code: { type: DataTypes.STRING, unique: true },
      user_id: { type: DataTypes.INTEGER, unique: true },
      phone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "codes",
    }
  );
  return Codes;
};
