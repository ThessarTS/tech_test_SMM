'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let items = require('./data/items.json')

    items.forEach(item => item.createdAt = item.updatedAt = new Date())

    await queryInterface.bulkInsert('Items', items)

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Items', null, {})

  }
};
