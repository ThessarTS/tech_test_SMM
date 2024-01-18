'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    let requests = require('./data/requests.json')

    requests.forEach(request => request.createdAt = request.updatedAt = new Date())

    await queryInterface.bulkInsert('Requests', requests)
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Requests', null, {})

  }
};
