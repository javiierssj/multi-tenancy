const express = require('express');
const userRoutes = require('../routes/userRoutes');
const taskRoutes = require('../routes/taskRoutes');
const { connectDB } = require('../utils/db');
const tenantMiddleware = require('../middleware/tenantMiddleware');
const logger = require('../utils/logger');

const app = express();

// Conexión a la base de datos
connectDB();

// Middleware para análisis de JSON entrante
app.use(express.json());

// Middleware para manejar multi-tenancy
app.use(tenantMiddleware);

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Middleware para manejar errores no capturados
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send({ error: 'An unexpected error occurred' });
});

// Iniciar el servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = app;
