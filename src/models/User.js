const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tenant_id: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
