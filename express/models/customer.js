'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      // Sale
      Customer.hasMany(models.Sale, {
        foreignKey: 'customer_id', as: 'sales'
      });
    }
  }

  Customer.init(
    {
      customer_name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      customer_type: {
        type: DataTypes.STRING(30),
        defaultValue: 'individual',
        validate: {
          isIn: [['individual', 'business']],
        },
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
      modelName: 'Customer',
      tableName: 'Customers',
    }
  );

  return Customer;
};