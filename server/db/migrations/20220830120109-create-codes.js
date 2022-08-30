"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("codes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.STRING,
        unique: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          model: "users",
          key: "id",
          as: "userId",
        },
      },
      phone: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("codes");
  },
};
