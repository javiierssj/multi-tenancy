const express = require('express');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const tenantMiddleware = require('./middleware/tenantMiddleware');
const logger = require('./utils/logger');

const app = express();

app.use(express.json());
app.use(tenantMiddleware);

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Manejo global de errores
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send('Internal Server Error');
});

module.exports = app;
