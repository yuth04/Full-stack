'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    static associate(models) {
      Purchase.belongsTo(models.Supplier, {
        foreignKey: 'supplier_id',
        as: 'supplier',
      });
      //
      Purchase.hasMany(models.PurchaseItem, {
        foreignKey: 'purchase_id',
        as: 'items',
      });
    }
  }

  Purchase.init(
    {
      purchase_number: {
        type: DataTypes.STRING,
        allowNull: true, // migration has no allowNull or unique; see note below
      },
      supplier_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, // see note below: this is wrong
        references: {
          model: 'Suppliers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      purchase_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      subtotal: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0,
      },
      tax: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0,
      },
      total_amount: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0,
      },
      paid_amount: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0,
      },
      due_amount: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0,
      },
      status: {
        type: DataTypes.STRING(30),
        defaultValue: 'draft',
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Purchase',
      tableName: 'Purchases',
    }
  );

  return Purchase;
};