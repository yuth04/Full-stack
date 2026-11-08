'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Dara',
        lastName: 'Chan',
        email: 'dara.chan@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Srey',
        lastName: 'Pov',
        email: 'sreypov@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Vicheka',
        lastName: 'Sok',
        email: 'vicheka.sok@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {})

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
