'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Warranty extends Model {
    static associate(models) {
      Warranty.belongsTo(models.ProductSerialNumber, {
        foreignKey: 'serial_number_id',
        as: 'serialNumber',
      });
      Warranty.belongsTo(models.SaleItem, {
        foreignKey: 'sale_item_id',
        as: 'saleItem',
      });

    }
  }

  Warranty.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      serial_number_id: {
        type: DataTypes.INTEGER, // must match ProductSerialNumbers.id; see note below
        allowNull: false,
        references: { model: 'ProductSerialNumbers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      sale_item_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: 'SaleItems', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      warranty_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      terms: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: 'active',
        validate: {
          isIn: [['active', 'expired', 'voided', 'claimed']],
        },
      },
    },
    {
      sequelize,
      modelName: 'Warranty',
      tableName: 'Warranties',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      validate: {
        endAfterStart() {
          if (this.end_date < this.start_date) {
            throw new Error('end_date cannot be before start_date');
          }
        },
      },
    }
  );

  return Warranty;
};