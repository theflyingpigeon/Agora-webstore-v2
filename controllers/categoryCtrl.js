const Category = require('../models/categoryModel')
const Products = require('../models/productModel')

const categoryCtrl = {
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (err) {
            res.status(500).json({msg: err.message});
        }
    },
    createCategory: async (req, res) => {
        try {
            const {name} = req.body;
            const category = await Category.findOne({name});
            if (category) return res.status(400).json({msg: "catergory already exists"})

            const newcategory = new Category({name})

            await newcategory.save()
            res.json({msg: 'Created a new category'})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const products = await Products.findOne({category: req.params.id})
            if (products) return res.status(400).json({msg: "Please delete or modify all products with this category"})

            await Category.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a category"})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    updateCategory: async (req, res) => {
        try {
            const {name} = req.body;
            await Category.findByIdAndUpdate({_id: req.params.id}, {name})
            res.json({msg: "Updated a category"})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
}

module.exports = categoryCtrl