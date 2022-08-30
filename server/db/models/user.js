const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.codes, { foreignKey: "user_id" });
    }
  }
  Users.init(
    {
      fullname: DataTypes.STRING,
      avatarUrl: DataTypes.STRING,
      isActive: DataTypes.INTEGER,
      username: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      provider: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return Users;
};
