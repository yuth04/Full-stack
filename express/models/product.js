'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // category
      Product.belongsTo(models.Category, {
        foreignKey: "category_id",

      });
      // brand
      Product.belongsTo(models.Brand, {
        foreignKey: "brand_id",

      });
      // variant
      Product.hasMany(models.ProductVariant, {
        foreignKey: "product_id", as: "product"
      });
      // LaptopSpecification
      Product.hasOne(models.LaptopSpecification, {
        foreignKey: 'product_id',
        as: 'laptopSpecification',
      });
      // image
      Product.hasMany(models.ProductImage, {
        foreignKey: 'product_id',
        as: 'images',
      });
      // ProductSerialNumber
      Product.hasMany(models.ProductSerialNumber, {
        foreignKey: 'product_id',
        as: 'serialNumbers',
      });
      // InventoryBatch
      Product.hasMany(models.InventoryBatch, {
        foreignKey: 'product_id', as: 'batches'
      });
    }
  }
  Product.init({
    productName: DataTypes.STRING,
    sku: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    category_id: DataTypes.INTEGER,
    brand_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    qty: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      get() {
        const raw = this.getDataValue("createdAt");

        if (!raw) return null;

        const date = new Date(raw);

        const parts = new Intl.DateTimeFormat("en-CA", {
          timeZone: "Asia/Phnom_Penh",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).formatToParts(date);

        const get = (type) => parts.find((p) => p.type === type)?.value;

        return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}:${get("second")} ${get("dayPeriod").toUpperCase()}`;
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        const raw = this.getDataValue("createdAt");

        if (!raw) return null;

        const date = new Date(raw);

        const parts = new Intl.DateTimeFormat("en-CA", {
          timeZone: "Asia/Phnom_Penh",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).formatToParts(date);

        const get = (type) => parts.find((p) => p.type === type)?.value;

        return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}:${get("second")} ${get("dayPeriod").toUpperCase()}`;
      },
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};