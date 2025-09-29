// knexfile.js
const path = require('path');
const dotenv = require('dotenv');

// Determina o arquivo .env a ser carregado com base na variável NODE_ENV
const env = process.env.NODE_ENV || 'development'; // Padrão para desenvolvimento
dotenv.config({ path: path.join(__dirname, `.env.${env}`) }); // Carrega o arquivo .env correspondente

module.exports = {
  client: 'mysql2', // Use 'mysql' ou 'mysql2' dependendo do driver
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306, // Utiliza a porta do .env, ou 3306 por padrão
  },
  migrations: {
    directory: './migrations', // Diretório para as migrações
  },
  seeds: {
    directory: './seeds', // Diretório para os seeds
  },
};