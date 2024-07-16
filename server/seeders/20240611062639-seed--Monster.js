'use strict';
let monster = require('../data/monster.json')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    monster = monster.map(el => {
      el.createdAt = el.updatedAt = new Date ()
      return el
    })
    await queryInterface.bulkInsert('Monsters', monster, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Monsters', null, {})
  }
};
