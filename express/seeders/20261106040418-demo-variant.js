'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const [products] = await queryInterface.sequelize.query(
      'SELECT id FROM "Products" ORDER BY id ASC LIMIT 10'
    );

    if (products.length === 0) {
      throw new Error('No products found. Seed Products before ProductVariants.');
    }

    // Variant templates: [suffix, variant_name, cost, selling]
    const templates = [
      ['8-256', '8GB / 256GB', 450.0, 549.0],
      ['16-512', '16GB / 512GB', 600.0, 729.0],
      ['32-1TB', '32GB / 1TB', 850.0, 999.0],
    ];

    const variants = [];
    for (const p of products) {
      for (const [suffix, name, cost, price] of templates) {
        variants.push({
          product_id: p.id,
          variant_name: name,
          sku: `SKU-${p.id}-${suffix}`,
          cost_price: cost,
          selling_price: price,
          is_active: true,
          createdAt: now,
          updatedAt: now,
        });
      }
    }

    await queryInterface.bulkInsert('ProductVariants', variants);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductVariants', {
      sku: { [Sequelize.Op.like]: 'SKU-%' },
    });
  },
};