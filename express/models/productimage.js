'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    static associate(models) {
      ProductImage.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product',
      });
    }
  }

  ProductImage.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, // see note below: this probably shouldn't be here
        references: {
          model: 'Products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      image_url: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      is_primary: {
        type: DataTypes.BOOLEAN,
        allowNull: true, // migration has no default or allowNull set
      },
    },
    {
      sequelize,
      modelName: 'ProductImage',
      tableName: 'ProductImages',
    }
  );

  return ProductImage;
};