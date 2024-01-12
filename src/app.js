const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const productRoutes = require('./routes/productRoutes');
const tenantMiddleware = require('./middleware/tenantMiddleware');
const logger = require('./utils/logger');

const app = express();

// Middlewares básicosaaaaa
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(tenantMiddleware);

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/products', productRoutes);

// Manejo global de errores
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send('Internal Server Error');
});

module.exports = app;
