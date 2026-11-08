'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PurchaseItem extends Model {
    static associate(models) {
      // Purchase
      PurchaseItem.belongsTo(models.Purchase, {
        foreignKey: 'purchase_id',
        as: 'purchase',
      });
      // Product
      PurchaseItem.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product',
      });
      // ProductVariant
      PurchaseItem.belongsTo(models.ProductVariant, {
        foreignKey: 'variant_id',
        as: 'variant',
      });
      // InventoryBatch
      PurchaseItem.hasOne(models.InventoryBatch, {
        foreignKey: 'purchase_item_id',
        as: 'inventoryBatch',
      });

    }
  }

  PurchaseItem.init(
    {
      purchase_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, // see note below: this is wrong
        references: {
          model: 'Purchases',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'Products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      variant_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
        references: {
          model: 'ProductVariants',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      unit_cost: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
      },
      discount: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0,
      },
      subtotal: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'PurchaseItem',
      tableName: 'PurchaseItems',
    }
  );

  return PurchaseItem;
};