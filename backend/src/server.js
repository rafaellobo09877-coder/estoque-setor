import express from 'express';
import routes from './routes/index.js';

const app = express();

app.use(express.json());

// rota teste (IMPORTANTE)
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// suas rotas
app.use('/api', routes);

// porta correta pro Render
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT);
});