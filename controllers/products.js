/******************************
**** Products Initializers ****
******************************/

//Initialize Express
const express = require('express');
const router = express.Router();

//Import Products Schema
const Product = require("../models/products.js");

//Import seed data
const productSeed = require('../models/products-seed.js')

/*********************************
**** Products Paths & Methods ****
*********************************/

//SEED route
router.get('/seed', async (req, res) => {
  Product.create(productSeed, (error, data) => {
    if (error)
      res.status(400).json({error: error.message});
    else
      res.status(200).json(data);
  });
});

// Index: Getting all product
router.get('/', (req, res) => {
  Product.find({}, (error, foundProduct) => {
    if (error)
      res.status(400).json({error: error.message});
    else
      res.status(200).json(foundProduct);
  });
});

// Show: Shows One Product
router.get('/:id', (req, res) => {
	Product.findById(req.params.id, (error, foundOneProduct) => {
    if (error)
      res.status(400).json({error: error.message});
    else
      res.status(200).json(foundOneProduct);
  });
});

//Delete: Deletes Product
router.delete('/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err, deletedProduct) => {
    if (err)
      res.status(400).json({ error: err.message });
    else {
      console.log('Product Deleted:', deletedProduct)
      res.status(200).json({status: 200, message: "Product ID " + deletedProduct._id + " deleted"});
    }
  });
});

//Post: Creates Product
router.post('/', async (req, res) => {
  Product.create(req.body, (error, createdProduct) => {
    if (error) 
      res.status(400).json({ error: error.message });
    else {
      console.log('Product Created:', createdProduct)
      res.status(200).json(createdProduct)
    }
  });
});

//Put: Edit Product
router.put('/:id', (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedProduct) => {
    if (err) 
      res.status(400).json({ error: err.message });
    else {
      console.log('Updated Product:', updatedProduct);
      res.status(200).json(updatedProduct)
    }
  });
});

module.exports = router;