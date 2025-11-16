const router = require('express').Router()
const authController = require('../controller/authController')


router.post('/signup',async(req,res)=>{
	await authController.signup(req,res);
})

router.post('/login',async(req,res)=>{
	await authController.login(req,res);
})

module.exports = router

