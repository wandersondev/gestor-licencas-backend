/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('terminais', function(table) {
    table.increments('terminais_id').primary(); // ID do terminal
    table.integer('empresas_id').unsigned().notNullable(); // Adiciona `unsigned()` para a chave estrangeira
    table.string('mac', 35).notNullable(); // Endereço MAC
    table.string('nome_computador', 50).notNullable(); // Nome do computador

    // Definindo a chave estrangeira
    table.foreign('empresas_id').references('empresas_id').inTable('empresas')
         .onDelete('CASCADE') // Opcional: define o que acontece ao deletar uma empresa
         .onUpdate('CASCADE'); // Opcional: mantém a integridade referencial
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('terminais');
};