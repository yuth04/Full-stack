'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LaptopSpecifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER
      },
      processor: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      generation: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      ram: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      storage: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      gpu: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      display_size: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      resolution: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      refresh_rate: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      battery: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      operating_system: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      weight: {
        type: Sequelize.STRING(50),
        allowNull: true,
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
    await queryInterface.dropTable('LaptopSpecifications');
  }
};