'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    const brands = [
      { name: 'Apple', slug: 'apple' },
      { name: 'Samsung', slug: 'samsung' },
      { name: 'Dell', slug: 'dell' },
      { name: 'HP', slug: 'hp' },
      { name: 'Lenovo', slug: 'lenovo' },
      { name: 'Asus', slug: 'asus' },
      { name: 'Acer', slug: 'acer' },
      { name: 'MSI', slug: 'msi' },
      { name: 'Logitech', slug: 'logitech' },
      { name: 'Xiaomi', slug: 'xiaomi' },
    ];

    await queryInterface.bulkInsert(
      'Brands',
      brands.map((b) => ({
        ...b,
        logo: null,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Brands', {
      slug: {
        [Sequelize.Op.in]: [
          'apple', 'samsung', 'dell', 'hp', 'lenovo',
          'asus', 'acer', 'msi', 'logitech', 'xiaomi',
        ],
      },
    });
  },
};