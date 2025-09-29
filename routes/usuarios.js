// routes/usuarios.js
const express = require('express');
const bcrypt = require('bcrypt');
const knex = require('knex')(require('../knexfile')); // Ajuste se necessário
const router = express.Router();

router.post('/', async (req, res) => {
  const { login, senha } = req.body;

  try {
    // Gerar um hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10); // O '10' é o número de rounds de salting

    // Inserir o usuário com a senha hash
    const [id] = await knex('usuarios').insert({ login, senha: hashedPassword });
    
    res.status(201).json({ id, login });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar usuário', details: error.message });
  }
});

module.exports = router;