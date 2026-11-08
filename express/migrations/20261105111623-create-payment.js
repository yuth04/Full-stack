'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      sale_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'Sales', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT' 
      },
      payment_number: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      payment_method: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false
      },
      transaction_reference: {
        type: Sequelize.STRING(150),
        allowNull: true
      },
      payment_status: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: 'pending'
      },
      paid_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      note: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('Payments', ['sale_id']);
    await queryInterface.addIndex('Payments', ['payment_method']);
    await queryInterface.addIndex('Payments', ['payment_status']);
    await queryInterface.addIndex('Payments', ['paid_at']);

  },

  async down(queryInterface) {
    await queryInterface.dropTable('Payments');
  }
};