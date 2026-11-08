'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LaptopSpecification extends Model {
    static associate(models) {
      LaptopSpecification.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product',
      });
    }
  }

  LaptopSpecification.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true, 
      },
      processor: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      generation: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      ram: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      storage: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      gpu: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      display_size: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      resolution: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      refresh_rate: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      battery: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      operating_system: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      weight: {
        type: DataTypes.STRING(50),
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
      modelName: 'LaptopSpecification',
      tableName: 'LaptopSpecifications',
    }
  );

  return LaptopSpecification;
};