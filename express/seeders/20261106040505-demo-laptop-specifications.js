'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    const [products] = await queryInterface.sequelize.query(
      'SELECT id FROM "Products" ORDER BY id ASC LIMIT 10'
    );

    if (products.length === 0) {
      throw new Error('No products found. Seed Products before LaptopSpecifications.');
    }

    const specs = [
      {
        processor: 'Intel Core i5',
        generation: '13th Gen',
        ram: '8GB DDR4',
        storage: '256GB SSD',
        gpu: 'Intel Iris Xe',
        display_size: '14 inch',
        resolution: '1920x1080',
        refresh_rate: '60Hz',
        battery: '50Wh',
        operating_system: 'Windows 11 Home',
        weight: '1.4 kg',
      },
      {
        processor: 'Intel Core i7',
        generation: '13th Gen',
        ram: '16GB DDR5',
        storage: '512GB NVMe SSD',
        gpu: 'NVIDIA GeForce RTX 3050',
        display_size: '15.6 inch',
        resolution: '1920x1080',
        refresh_rate: '144Hz',
        battery: '70Wh',
        operating_system: 'Windows 11 Home',
        weight: '2.1 kg',
      },
      {
        processor: 'AMD Ryzen 7',
        generation: '7000 Series',
        ram: '16GB DDR5',
        storage: '1TB NVMe SSD',
        gpu: 'NVIDIA GeForce RTX 4060',
        display_size: '16 inch',
        resolution: '2560x1600',
        refresh_rate: '165Hz',
        battery: '80Wh',
        operating_system: 'Windows 11 Pro',
        weight: '2.3 kg',
      },
      {
        processor: 'Apple M2',
        generation: 'M2',
        ram: '8GB Unified',
        storage: '256GB SSD',
        gpu: '8-core GPU',
        display_size: '13.6 inch',
        resolution: '2560x1664',
        refresh_rate: '60Hz',
        battery: '52.6Wh',
        operating_system: 'macOS',
        weight: '1.24 kg',
      },
    ];

    // Cycle through the templates so each product gets one spec row
    const rows = products.map((p, i) => ({
      product_id: p.id,
      ...specs[i % specs.length],
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert('LaptopSpecifications', rows);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('LaptopSpecifications', null, {});
  },
};