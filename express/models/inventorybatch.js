'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class InventoryBatch extends Model {
    static associate(models) {
      InventoryBatch.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product',
      });
      InventoryBatch.belongsTo(models.ProductVariant, {
        foreignKey: 'variant_id',
        as: 'variant',
      });
      InventoryBatch.belongsTo(models.PurchaseItem, {
        foreignKey: 'purchase_item_id',
        as: 'purchaseItem',
      });

    }
  }

  InventoryBatch.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      variant_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'ProductVariants', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      purchase_item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: 'PurchaseItems', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      quantity_received: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: { min: 0 },
      },
      quantity_remaining: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: { min: 0 },
      },
      unit_cost: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      received_at: {
        type: DataTypes.DATE,
        allowNull: false,
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
      modelName: 'InventoryBatch',
      tableName: 'InventoryBatches',
      validate: {
        remainingNotAboveReceived() {
          if (this.quantity_remaining > this.quantity_received) {
            throw new Error('quantity_remaining cannot exceed quantity_received');
          }
        },
      },
    }
  );

  return InventoryBatch;
};