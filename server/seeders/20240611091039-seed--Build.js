'use strict';
let build = require('../data/build.json')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   build = build.map((el) => {
    el.head = JSON.stringify(el.head)
    el.chest = JSON.stringify(el.chest)
    el.legs = JSON.stringify(el.legs)
    el.waist = JSON.stringify(el.waist)
    el.gloves = JSON.stringify(el.gloves)
    el.weapon = JSON.stringify(el.weapon)
    el.createdAt = el.updatedAt = new Date ()
    return el
   })
   await queryInterface.bulkInsert('Builds', build, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Builds', null, {})
  }
};
