'use strict';

const { hashPassword } = require("../helpers/bcrypt");
const usersData = [{
  email: "admin@mail.com",
  password: hashPassword(`1234`),
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  email: "customer@mail.com",
  password: hashPassword(`1234`),
  role: "customer",
  createdAt: new Date(),
  updatedAt: new Date()
}];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', usersData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};