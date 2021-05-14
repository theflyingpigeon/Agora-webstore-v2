const Products = require('../models/productModel')

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString}

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|tl|lte|regex)\b/g, match => '$' + match)

        this.query.find(JSON.parse(queryStr))

        return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)

        return this;
    }
}

const productCtrl = {
    getProducts: async (req, res) => {
        try{
            const features = new APIfeatures(Products.find(), req.query).filtering().sorting().paginating()
            const products = await features.query

            res.json({
                status: 'success',
                result: products.length,
                products: products
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createProduct: async (req, res) => {
        try{
            const {product_id, title, price, description, content, images, category, stock, clothing, S, M, L, XL} = req.body;
            console.log(req.body);
            if(!images) return res.status(400).json({msg: "No image uploaded"})

            const product = await Products.findOne({product_id})
            if(product) return res.status(400).json({msg: "Product already exists"})

            const newProduct = new Products({
                    product_id, title: title.toLowerCase(), price, description, content, images, category, stock, clothing, S, M, L, XL
                })

            await newProduct.save()

            res.json({msg: 'Created a new product'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteProduct: async (req, res) => {
        try{
            await Products.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateProduct: async (req, res) => {
        try{
            const {title, price, description, content, images, category, stock, clothing, S, M, L, XL} = req.body;
            if(!images) return res.status(400).json({msg: "No image uploaded"});

            await Products.findByIdAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), price, description, content, images, category, stock, clothing, S, M, L, XL
            })

            res.json("Product updated")
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateStock: async (req, res) => {
        try{
            const {id, stock, quantity, state} = req.body

            let updateStock;

            if (state) {
                updateStock = stock - quantity
            } else {
                updateStock = stock + quantity
            }

            await Products.findByIdAndUpdate({_id: id}, {
                stock: updateStock
            })
            res.json({msg: "stock successfully updated"})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    setStock: async (req, res) => {
        try{
            const {id, stock} = req.body

            await Products.findByIdAndUpdate({_id: id}, {
                stock: stock
            })
            res.json({msg: "stock successfully"})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    setStockS: async (req, res) => {
        try{
            const {id, stock, S} = req.body

            await Products.findByIdAndUpdate({_id: id}, {
                S: S,
                stock: stock
            })
            res.json({msg: "stock successfully"})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    setStockM: async (req, res) => {
        try{
            const {id, stock,M} = req.body

            await Products.findByIdAndUpdate({_id: id}, {
                M: M,
                stock: stock
            })
            res.json({msg: "stock successfully"})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    setStockL: async (req, res) => {
        try{
            const {id, stock, L} = req.body

            await Products.findByIdAndUpdate({_id: id}, {
                L: L,
                stock: stock
            })
            res.json({msg: "stock successfully"})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    setStockXL: async (req, res) => {
        try{
            const {id, stock, XL} = req.body

            await Products.findByIdAndUpdate({_id: id}, {
                XL: XL,
                stock: stock
            })
            res.json({msg: "stock successfully"})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    setSize: async (req, res) => {
        try{
            const {sStock, sAvailible, mStock, mAvailible, lStock, lAvailible, xlStock, xlAvailible} = req.body;

            const ssize = {Stock: sStock, Availible: sAvailible}
            const msize = {Stock: mStock, Availible: mAvailible}
            const lsize = {Stock: lStock, Availible: lAvailible}
            const xlsize = {Stock: xlStock, Availible: xlAvailible}

            res.json({stock: {ssize, msize, lsize, xlsize}})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = productCtrl