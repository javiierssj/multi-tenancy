const dbConnectionManager = require('../utils/dbConnectionManager');

/**
 * Middleware para manejar el multi-tenancy.
 * Identifica al tenant basado en la solicitud y establece la conexión a la base de datos correspondiente.
 */
const tenantMiddleware = async (req, res, next) => {
  try {
    // Identificar el tenant. Esto puede variar según tu enfoque, por ejemplo:
    // 1. Subdominio: tenantId = req.subdomains[0] =>     const subdomain = req.hostname.split('.')[0];
    // 2. Encabezado HTTP: tenantId = req.headers['X-Tenant-ID'] => const tenantId = req.headers['x-tenant-id'];
    // 3. Otro método basado en tu lógica de aplicación.
    const subdomain = req.hostname.split('.')[0];

    if (!subdomain) {
      return res.status(400).send({ error: 'Subdomain not provided' });
    }

    // Aquí puedes tener una lógica para manejar "www" o subdominios no válidos
    // Por ejemplo, ignorar 'www' o enviar error si el subdominio no está en la lista de tenants permitidos

    // Obtener o crear una conexión a la base de datos para el tenant identificado por subdominio
    const dbConnection = await dbConnectionManager.getConnectionForTenant(subdomain);

    // Adjuntar la conexión a la base de datos y el subdominio a la solicitud
    req.dbConnection = dbConnection;
    req.tenantSubdomain = subdomain;

    next();
  } catch (error) {
    return res.status(500).send({ error: 'Failed to establish tenant database connection' });
  }
};

module.exports = tenantMiddleware;
