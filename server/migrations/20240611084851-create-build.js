'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Builds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      MonsterId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Monsters',
          key: 'id'
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      head: {
        type: Sequelize.JSON
      },
      chest: {
        type: Sequelize.JSON
      },
      legs: {
        type: Sequelize.JSON
      },
      waist: {
        type: Sequelize.JSON
      },
      gloves: {
        type: Sequelize.JSON
      },
      weapon: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Builds');
  }
};