'use strict';

const categoriesData = [
  {
    name: "Ruang Keluarga",
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Kamar Tidur",
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Dapur",
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', categoriesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};