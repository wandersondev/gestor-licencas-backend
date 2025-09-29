// routes/login.js
const express = require('express');
const bcrypt = require('bcrypt');
const knex = require('knex')(require('../knexfile'));
const router = express.Router();

router.post('/', async (req, res) => {
  const { login, senha } = req.body;

  try {
    // Obter o usuário do banco de dados
    const user = await knex('usuarios').where({ login }).first();
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Comparar a senha fornecida com o hash armazenado
    const passwordMatch = await bcrypt.compare(senha, user.senha);
    
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    res.status(200).json({ message: 'Login bem-sucedido' }); // Retorne o que for apropriado
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar login', details: error.message });
  }
});

module.exports = router;