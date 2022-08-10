'use strict';                        //Criar seed npx sequelize-cli seed:generate --name seed-categories-table
                                    //inserindo informações mais rapido sem entrar no adminJS
                                    //Enviar estrutura para banco de dados npx sequelize-cli db:seed:all
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      { name: 'Tecnologias Back-end', position: 1, created_at: new Date(), updated_at: new Date() },
      { name: 'Tecnologias Front-end', position: 2, created_at: new Date(), updated_at: new Date() },
      { name: 'Ferramentas de Desenvolvimento', position: 3, created_at: new Date(), updated_at: new Date() },
      { name: 'Soft-skills', position: 4, created_at: new Date(), updated_at: new Date() },
      { name: 'Carreira', position: 5, created_at: new Date(), updated_at: new Date() },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {})
  }
};