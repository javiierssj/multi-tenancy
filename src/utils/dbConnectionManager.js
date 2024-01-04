const mongoose = require("mongoose");
const config = require("../config");

class DBConnectionManager {
  constructor() {
    this.connections = {};
  }

  async getConnectionForTenant(tenantId) {
    if (!this.connections[tenantId]) {
      const tenantDbUri = `${config.db.mongoDB.type}://${config.db.mongoDB.user}:${config.db.mongoDB.passowrd}@${config.db.mongoDB.host}/${tenantId}?retryWrites=true&w=majority`;
      const tenantConnection = await mongoose.createConnection(tenantDbUri);
      this.connections[tenantId] = tenantConnection;
    }

    return this.connections[tenantId];
  }
}

module.exports = new DBConnectionManager();
