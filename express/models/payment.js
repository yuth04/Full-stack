'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      // Sale
      Payment.belongsTo(models.Sale, {
        foreignKey: 'sale_id', as: 'sale'
      });

    }
  }

  Payment.init(
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
        onDelete: 'RESTRICT',
      },
      payment_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      payment_method: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          isIn: [['cash', 'card', 'bank_transfer', 'aba', 'khqr', 'other']],
        },
      },
      amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        validate: { min: 0.01 },
      },
      transaction_reference: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      payment_status: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: 'pending',
        validate: {
          isIn: [['pending', 'completed', 'failed', 'refunded']],
        },
      },
      paid_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: true,
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
      modelName: 'Payment',
      tableName: 'Payments',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return Payment;
};