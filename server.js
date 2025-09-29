// server.js
const express = require('express');
const cors = require('cors'); // Importa o middleware CORS
const app = express();
// Habilitar CORS
// Configurações do CORS
const corsOptions = {
  origin: '*', // Permitir todos os domínios (pode ser configurado para um domínio específico)
  methods: ['GET', 'OPTIONS', 'PATCH', 'DELETE', 'POST', 'PUT'],
  allowedHeaders: [
    'X-CSRF-Token', 
    'X-Requested-With', 
    'Accept', 
    'Accept-Version', 
    'Content-Length', 
    'Content-MD5', 
    'Content-Type', 
    'Date', 
    'X-Api-Version', 
    'Authorization',
    'Access-Control-Allow-Origin',
  ],
  credentials: true,
};

// Usar CORS
app.use(cors(corsOptions));
app.use(express.json());
const empresasRoutes = require('./routes/empresas');
const usuariosRoutes = require('./routes/usuarios');
const loginRoutes = require('./routes/login'); // Importa as rotas de login
const terminaisRoutes = require('./routes/terminais'); // Importa as rotas de terminais
// Definindo as rotas
app.use('/api/empresas', empresasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/login', loginRoutes); // Define a rota de login
app.use('/api/terminais', terminaisRoutes); // Define a rota de terminais

const PORT = 3000;


app.get('/api/empresas', (req, res) => {
  // Seu código para lidar com a requisição
  res.json({ message: 'API de empresas' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});