const router = require('express').Router()
const productController = require('../controller/productController')


router.get('/',async(req,res)=>{
	await productController.getAll(req,res);
})


router.get('/:id',async(req,res)=>{
	await productController.getById(req,res);
})

module.exports = router

