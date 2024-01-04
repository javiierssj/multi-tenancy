const Tenant = require('../models/Tenant'); // Modelo para acceder a la lista de tenants

const tenantMiddleware = async (req, res, next) => {
  try {
    const subdomain = req.hostname.split('.')[0];
    const tenant = await Tenant.findOne({ subdomain });

    if (!tenant) {
      return res.status(403).send({ error: 'Tenant not allowed' });
    }

    const dbConnection = await dbConnectionManager.getConnectionForTenant(subdomain);
    req.dbConnection = dbConnection;
    req.tenantSubdomain = subdomain;

    next();
  } catch (error) {
    return res.status(500).send({ error: 'Error verifying tenant' });
  }
};

module.exports = tenantMiddleware;