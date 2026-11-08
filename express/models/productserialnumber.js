'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductSerialNumber extends Model {
    static associate(models) {
      // Product
      ProductSerialNumber.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product',
      });
      // ProductVariant
      ProductSerialNumber.belongsTo(models.ProductVariant, {
        foreignKey: 'variant_id',
        as: 'variant',
      });
      // Warranty
      ProductSerialNumber.hasMany(models.Warranty, {
        foreignKey: 'serial_number_id', as: 'warranties'
      });
    }
  }

  ProductSerialNumber.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, // see note below: this is almost certainly wrong
        references: {
          model: 'Products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      variant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, // see note below: this is almost certainly wrong
        references: {
          model: 'ProductVariants',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'ProductSerialNumber',
      tableName: 'ProductSerialNumbers',
    }
  );

  return ProductSerialNumber;
};