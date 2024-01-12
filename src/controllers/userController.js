const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const userController = {
  /**
   * Obtiene todos los usuarios
   * @param {Object} req - Objeto de solicitud de Express
   * @param {Object} res - Objeto de respuesta de Express
   */
  async listUser(req, res) {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  /**
   * Registra un nuevo usuario
   * @param {Object} req - Objeto de solicitud de Express
   * @param {Object} res - Objeto de respuesta de Express
   */
  async register(req, res) {
    try {
      const tenantId = req.headers['x-tenant-id'];
      const hashedPassword = await bcrypt.hash(req.body.password, 8);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        tenant_id: tenantId 
      });
      await user.save();
      const token = jwt.sign({ _id: user._id.toString() }, config.jwtSecret);
      res.status(201).json({ user: user, token: token });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  /**
   * Inicia sesión de un usuario
   * @param {Object} req - Objeto de solicitud de Express
   * @param {Object} res - Objeto de respuesta de Express
   */
  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).send({ error: "Unable to login, account don't exist" });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send({ error: "Unable to login, don't match email with password" });
      }
      const token = jwt.sign({ _id: user._id.toString() }, config.jwtSecret);
      res.status(200).json({ user: user, token: token });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getUserProfile(req, res) {
    res.send(req.user);
  },

  async updateUserProfile(req, res) {
    try {
      const updates = Object.keys(req.body);
      updates.forEach((update) => (req.user[update] = req.body[update]));
      await req.user.save();
      res.send(req.user);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async deleteUser(req, res) {
    try {
      await req.user.remove();
      res.send(req.user);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = userController;
