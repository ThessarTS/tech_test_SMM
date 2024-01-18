'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    let reqItems = require('./data/requestedItems.json')

    reqItems.forEach(reqItem => reqItem.createdAt = reqItem.updatedAt = new Date())

    await queryInterface.bulkInsert('RequestedItems', reqItems)
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('RequestedItems', null, {})

  }
};
