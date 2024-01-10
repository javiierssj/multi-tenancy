const Task = require("../models/Task");

const taskController = {
  async createTask(req, res) {
    try {
      const tenantId = req.headers['x-tenant-id'];
      const task = new Task({
        ...req.body,
        tenant_id: tenantId,
        owner: req.user._id,
      });
      await task.save();
      res.status(201).send(task);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async getAllTasks(req, res) {
    try {
      const tasks = await Task.find({ owner: req.user._id });
      res.send(tasks);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getTaskById(req, res) {
    try {
      const task = await Task.findOne({
        _id: req.params.taskId,
        owner: req.user._id,
      });
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async updateTask(req, res) {
    try {
      const {title, description, completed, state, activities} = req.body;
      const task = await Task.findOneAndUpdate(
        { _id: req.params.taskId, owner: req.user._id },
        {
          title: title,
          description: description,
          completed: completed,
          state: state,
          activities: activities,
        },
        { new: true, runValidators: true }
      );
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async deleteTask(req, res) {
    try {
      const task = await Task.findOneAndDelete({
        _id: req.params.taskId,
        owner: req.user._id,
      });
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = taskController;
