'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    static associate(models) {
      // product
      ProductVariant.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product',
      });
      // ProductSerialNumber
      ProductVariant.hasMany(models.ProductSerialNumber, {
        foreignKey: 'variant_id',
        as: 'serialNumbers',
      });
      // InventoryBatch
      ProductVariant.hasMany(models.InventoryBatch, {
        foreignKey: 'variant_id', as: 'batches'
      });
    }
  }

  ProductVariant.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      variant_name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      sku: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true,
      },
      cost_price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      selling_price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
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
    },
    {
      sequelize,
      modelName: 'ProductVariant',
      tableName: 'ProductVariants',
    }
  );

  return ProductVariant;
};