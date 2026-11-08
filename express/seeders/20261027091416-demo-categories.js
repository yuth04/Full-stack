'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Smartphones & Tablets',
        description: 'Mobile phones, tablets, and cellular communication devices.',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Audio & Headphones',
        description: 'Wireless earbuds, over-ear noise-canceling headphones, and portable speakers.',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Power & Charging',
        description: 'Portable power banks, wall adapters, GaN fast chargers, and charging cables.',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Wearables & Smartwatches',
        description: 'Fitness trackers, smartwatches, and health-monitoring bands.',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Smart Home & IoT',
        description: 'Smart light bulbs, security cameras, smart plugs, and automated home hubs.',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Networking & Routers',
        description: 'Wi-Fi 6 routers, whole-home mesh systems, and network switches.',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tech Accessories',
        description: 'Tempered glass screen protectors, phone cases, stands, and docks.',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};