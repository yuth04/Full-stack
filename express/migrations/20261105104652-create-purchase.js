'use strict';

const { Model } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Purchases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      purchase_number: {
        type: Sequelize.STRING
      },
      supplier_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        reference: {
          model: 'Suppliers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      purchase_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      subtotal: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: 0
      },
      discount: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: 0
      },
      tax: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: 0
      },
      total_amount: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: 0
      },
      paid_amount: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: 0
      },
      due_amount: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: 0
      },
      status: {
        type: Sequelize.STRING(30),
        defaultValue: 'draft'
      },
      note: {
        type: Sequelize.TEXT,
        allowNull: true
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
    await queryInterface.dropTable('Purchases');
  }
};