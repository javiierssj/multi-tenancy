const Product = require("../models/Product");

const productController = {
    async createProduct(req, res) {
        try {
            const tenantId = req.headers['x-tenant-id'];
            const product = new Product({
                ...req.body,
                tenant_id: tenantId,
                owner: req.user._id,
            });
            await product.save();
            res.status(201).send(product);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    async getAllProducts(req, res) {
        try {
            const products = await Product.find({ owner: req.user._id });
            res.send(products);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async getProductById(req, res) {
        try {
            const product = await Product.findOne({
                _id: req.params.productId,
                owner: req.user._id,
            });
            if (!product) {
                return res.status(404).send();
            }
            res.send(product);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async updateProduct(req, res) {
        try {
            const { title, description, completed, state, activities } = req.body;
            const product = await Product.findOneAndUpdate(
                { _id: req.params.productId, owner: req.user._id },
                {
                    title: title,
                    description: description,
                    completed: completed,
                    state: state,
                    activities: activities,
                },
                { new: true, runValidators: true }
            );
            if (!product) {
                return res.status(404).send();
            }
            res.send(product);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    async deleteProduct(req, res) {
        try {
            const product = await Product.findOneAndDelete({
                _id: req.params.productId,
                owner: req.user._id,
            });
            if (!product) {
                return res.status(404).send();
            }
            res.send(product);
        } catch (error) {
            res.status(500).send(error);
        }
    },
};

module.exports = productController;
