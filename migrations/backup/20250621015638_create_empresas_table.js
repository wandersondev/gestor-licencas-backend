/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('empresas', function(table) {
    table.increments('empresas_id').primary(); // Cria um campo ID autoincremental e chave primária
    table.string('cnpj').notNullable().unique(); // Campo CNPJ, não nulo e único
    table.string('razao').notNullable(); // Campo Razão Social, não nulo
    table.string('endereco').notNullable(); // Campo Endereço, não nulo
    table.string('cidade').notNullable(); // Campo Cidade, não nulo
    table.string('bairro').notNullable(); // Campo Bairro, não nulo
    table.string('cep').notNullable(); // Campo CEP, não nulo
    table.string('uf', 2).notNullable(); // Campo Unidade Federativa, não nulo com tamanho 2
    table.string('fone'); // Campo Telefone, opcional
    table.string('email').notNullable(); // Campo Email, não nulo
    table.date('data').notNullable(); // Campo Data, não nulo
    table.integer('ntermais').defaultTo(0); // Campo Ntermais, padrão 0
    table.string('serial'); // Campo Serial, opcional
    table.date('validade_licenca'); // Campo Validade da Licença, opcional
    table.boolean('bloqueado').defaultTo(false); // Campo Bloqueado, padrão false
    table.string('cnpj_representante'); // Campo CNPJ do Representante, opcional
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('empresas'); // Remove a tabela caso exista
};


