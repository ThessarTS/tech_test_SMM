'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    let users = require('./data/users.json')

    users.forEach(user => user.createdAt = user.updatedAt = new Date())

    await queryInterface.bulkInsert('Users', users)

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {});

  }
};
