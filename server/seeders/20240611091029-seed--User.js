'use strict';
let user = require('../data/user.json')
let {hashPass} = require('../helper/bcrypt')
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
    user = user.map((el) => {
      el.password = hashPass(el.password)
      el.createdAt = el.updatedAt = new Date ()
      return el
    })
    await queryInterface.bulkInsert('Users', user, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
