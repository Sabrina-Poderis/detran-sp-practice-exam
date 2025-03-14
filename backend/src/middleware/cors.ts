import cors from 'cors';

const corsMiddleware = cors({
  origin: 'http://localhost:3000', // Ajuste conforme o domínio do frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Permite envio de cookies e autenticação
});

export default corsMiddleware;
