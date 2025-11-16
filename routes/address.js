const router = require('express').Router()
const addressController = require('../controller/addressController')


router.get('/',async(req,res)=>{
	await addressController.get(req,res);
})


router.post('/',async(req,res)=>{
	await addressController.create(req,res);
})

router.put('/:id',async(req,res)=>{
	await addressController.update(req,res);
})

module.exports = router

