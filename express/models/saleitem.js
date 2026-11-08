'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SaleItem extends Model {
    static associate(models) {
      SaleItem.belongsTo(models.Sale, { foreignKey: 'sale_id', as: 'sale' });
      SaleItem.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
      SaleItem.belongsTo(models.ProductVariant, { foreignKey: 'variant_id', as: 'variant' });
      SaleItem.hasMany(models.Warranty, { foreignKey: 'sale_item_id', as: 'warranties' })
    }
  }

  SaleItem.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      sale_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: 'Sales', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      product_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: 'Products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      variant_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: { model: 'ProductVariants', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1 },
      },
      unit_price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        validate: { min: 0 },
      },
      unit_cost: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        validate: { min: 0 },
      },
      discount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
        validate: { min: 0 },
      },
      subtotal: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'SaleItem',
      tableName: 'SaleItems',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      hooks: {
        beforeValidate: (item) => {
          const qty = Number(item.quantity);
          const price = Number(item.unit_price);
          const discount = Number(item.discount || 0);
          if (Number.isFinite(qty) && Number.isFinite(price)) {
            item.subtotal = (qty * price - discount).toFixed(2);
          }
        },
      },
    }
  );

  return SaleItem;
};