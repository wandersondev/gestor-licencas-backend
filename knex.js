// knex.js

const knex = require('knex');
const knexConfig = require('./knexfile');

// Cria a instância do Knex com a configuração do arquivo knexfile.js
const db = knex(knexConfig);

// Exporta a instância do Knex
module.exports = db;