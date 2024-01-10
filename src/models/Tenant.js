const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  subdomain: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

tenantSchema.index({ subdomain: 1 });

const Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;
