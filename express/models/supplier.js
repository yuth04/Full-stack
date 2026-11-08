'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    static associate(models) {
      // Purchase
      Supplier.hasMany(models.Purchase, {
        foreignKey: 'supplier_id',
        as: 'purchases',
      });
      // e.g. a supplier supplies many products or purchase orders:
      // Supplier.hasMany(models.Product, {
      //   foreignKey: 'supplier_id',
      //   as: 'products',
      // });
      // Supplier.hasMany(models.PurchaseOrder, {
      //   foreignKey: 'supplier_id',
      //   as: 'purchaseOrders',
      // });
    }
  }

  Supplier.init(
    {
      supplier_name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      contact_person: {
        type: DataTypes.STRING(150),
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
      company_name: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true, // migration has no allowNull or default; see note below
      },
    },
    {
      sequelize,
      modelName: 'Supplier',
      tableName: 'Suppliers',
    }
  );

  return Supplier;
};