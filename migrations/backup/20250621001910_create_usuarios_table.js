/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// migrations/XXXXXXXXXXXXXX_create_usuarios_table.js
exports.up = function(knex) {
  return knex.schema.createTable('usuarios', (table) => {
    table.increments('usuarios_id').primary(); // ID autoincremental
    table.string('login').notNullable(); // Campo de login
    table.string('senha').notNullable(); // Campo de senha
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function(knex) {
  return knex.schema.dropTable('usuarios');
};
