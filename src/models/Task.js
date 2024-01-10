const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
    enum: ['Pendiente', 'En progreso', 'Terminado'],
    default: 'Pendiente',
    required: true,
  },
  activities: [{
    name: {
      type: String,
      required: true,
    },
    finished: {
      type: Boolean,
      default: false,
    },
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  tenant_id: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true,
  },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;