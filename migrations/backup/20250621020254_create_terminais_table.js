/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema.createTable('terminais', function(table) {
    table.increments('terminais_id').primary();
    table.integer('empresas_id').notNullable();
    table.string('mac', 35).notNullable();
    table.string('nome_computador', 50).notNullable();

    // Se você tiver uma relação com a tabela empresas
    table.foreign('empresas_id').references('empresas_id').inTable('empresas'); // Ajuste de acordo com a tabela
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('terminais');
};
