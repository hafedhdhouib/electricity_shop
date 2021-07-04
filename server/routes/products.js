const { Product } = require('../models/product');
const express = require('express');
const router = express.Router();

//get products liste 

router.get(`/`, async (req, res) => {
    const productList = await Product.find();

    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList);
})
// get a product
router.get('/:id', async (req,res)=>{
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(400).send('product not fund')
    }
    else {
        res.send(product)
    }
})
// update a product
router.put('/:id', async (req,res)=>{
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name ,
            price: req.body.price,
            ref:req.body.ref,
            countInStock: req.body.countInStock,
            image: req.body.image            
        },
        {   useFindAndModify: false,
            new: true
        }
    )
    if (!product)
    return res.status(500).send('product cannot updated')

    res.send(product)
})

// add new product

router.post('/', async (req, res) => {
    console.log(req.body);
    let product = new Product({
        name: req.body.name,
        ref: req.body.ref,
        price: req.body.price,
        countInStock: req.body.countInStock,
        image: req.body.image
    })
    product = await product.save()
    if (!product)
        return res.status(400).send('the Product cannot be created!')

    res.send(product);
})

// delate product

router.delete('/:id', async (req,res)=>{
    const product = await Product.findByIdAndRemove(req.params.id,
        {   useFindAndModify: false,
            new: true
        })
    if (!product)
    return res.status(404).send('product not found!')
    else
    return res.status(200).send('the product is deleted!')

})

module.exports = router;