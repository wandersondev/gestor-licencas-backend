// routes/empresas.js

const express = require('express');
const knex = require('knex')(require('../knexfile')); 
const router = express.Router();

// Listar todas as empresas
router.get('/', async (req, res) => {
  try {
    const empresas = await knex('empresas').select('*');
    res.json(empresas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar empresas', details: error.message });
  }
});

// Endpoint para criar uma nova empresa
router.post('/', async (req, res) => {
  const {
    cnpj,
    razao,
    endereco,
    cidade,
    bairro,
    cep,
    uf,
    fone,
    email,
    data,
    ntermais,
    serial,
    validade_licenca,
    bloqueado,
    cnpj_representante,
  } = req.body;

  try {
    const [id] = await knex('empresas').insert({
      cnpj,
      razao,
      endereco,
      cidade,
      bairro,
      cep,
      uf,
      fone,
      email,
      data,
      ntermais,
      serial,
      validade_licenca,
      bloqueado,
      cnpj_representante,
    });

    res.status(201).json({ id, cnpj, razao });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar empresa', details: error.message });
  }
});

// Endpoint para editar uma empresa
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  // Verifica se os dados estão sendo passados corretamente
  const { ntermais, validade_licenca, bloqueado } = req.body;

  try {
    // Verifica se a empresa existe
    const empresaExistente = await knex('empresas').where({ empresas_id: id }).first();
    console.log('Dados da empresa:', empresaExistente); // Debug
    if (!empresaExistente) {
      return res.status(404).json({ error: 'Empresa não encontrada' });
    }

    // Atualiza a empresa apenas com os novos dados
    await knex('empresas')
      .where({ empresas_id: id })
      .update({
        ntermais,         // Atualiza quantidade de terminais
        validade_licenca, // Atualiza a validade da licença
        bloqueado,        // Atualiza o status de bloqueio
      });

    // Retorna a empresa atualizada
    const empresaAtualizada = await knex('empresas').where({ empresas_id: id }).first();
    res.json(empresaAtualizada);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar empresa', details: error.message });
  }
});

module.exports = router;