const router = require('express').Router()
const cartController = require('../controller/cartController')


router.get('/',async(req,res)=>{
	await cartController.get(req,res);
})
router.get('/orders',async(req,res)=>{
	await cartController.getOrders(req,res);
})
router.post('/',async(req,res)=>{
	await cartController.add(req,res);
})
router.post('/orders',async(req,res)=>{
	await cartController.placeOrder(req,res);
})
router.delete('/:id',async(req,res)=>{
	await cartController.remove(req,res);
})

module.exports = router

