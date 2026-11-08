'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Warranties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      serial_number_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'ProductSerialNumbers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      sale_item_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'SaleItems', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      warranty_type: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      terms: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: 'active'
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

    await queryInterface.addIndex('Warranties', ['serial_number_id']);
    await queryInterface.addIndex('Warranties', ['sale_item_id']);
    await queryInterface.addIndex('Warranties', ['status', 'end_date']);  },

  async down(queryInterface) {
    await queryInterface.dropTable('Warranties');
  }
};