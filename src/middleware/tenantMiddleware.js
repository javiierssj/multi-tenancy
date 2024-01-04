// src/middleware/tenantMiddleware.js

const Tenant = require('../models/Tenant');
const dbConnectionManager = require('../utils/dbConnectionManager');

const tenantMiddleware = async (req, res, next) => {
  try {
    const tenantId = req.headers['x-tenant-id'];

    if (!tenantId) {
      return res.status(400).send({ error: 'Tenant ID not provided' });
    }

    const tenant = await Tenant.findById(tenantId);
    if (!tenant) {
      return res.status(403).send({ error: 'Tenant not allowed' });
    }

    const dbConnection = await dbConnectionManager.getConnectionForTenant(tenantId);
    req.dbConnection = dbConnection;
    req.tenantId = tenantId;

    next();
  } catch (error) {
    return res.status(500).send({ error: 'Error verifying tenant' });
  }
};

module.exports = tenantMiddleware;
