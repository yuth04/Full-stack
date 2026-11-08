'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InventoryBatches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT' 
      },
      variant_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'ProductVariants', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      purchase_item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, 
        references: { model: 'PurchaseItems', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      quantity_received: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      quantity_remaining: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      unit_cost: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false
      },
      received_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    await queryInterface.addIndex('InventoryBatches', ['product_id', 'variant_id']);
    await queryInterface.addIndex('InventoryBatches', ['received_at']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('InventoryBatches');
  }
};