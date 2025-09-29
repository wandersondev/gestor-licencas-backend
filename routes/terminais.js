// routes/terminais.js
const express = require('express');
const knex = require('knex')(require('../knexfile'));
const db = require('../knex'); // Importa a conexão do Knex
const router = express.Router();

router.post('/', async (req, res) => {
  const { empresas_id, mac, nome_computador } = req.body;

  try {
    const [id] = await knex('terminais').insert({
      empresas_id, // Certifique-se de que empresas_id corresponde ao nome da coluna na tabela
      mac,
      nome_computador,
    });

    res.status(201).json({ empresas_id, mac, nome_computador });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar terminal', details: error.message });
  }
});

// Rota para obter terminais por empresa
router.get('/', async (req, res) => {
  const empresaId = req.query.empresaId; // Obtém o ID da empresa da query string

  // Verifica se o ID foi passado
  if (!empresaId) {
    return res.status(400).json({ error: 'O ID da empresa é necessário.' });
  }

  try {
    // Executa a consulta SQL utilizando o Knex
    const terminais = await db('terminais').where('empresas_id', empresaId);
    res.json(terminais); // Retorna os resultados como uma resposta JSON
  } catch (error) {
    console.error('Erro ao buscar terminais:', error);
    return res.status(500).json({ error: 'Erro ao buscar terminais.' });
  }
});


module.exports = router;