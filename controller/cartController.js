const cartDao = require('../dao/cartDao.js')


const cartController = {
	add: async(req,res)=>{	
		try{
			console.log(req.body)
			await cartDao.add(req.body)
            res.status(201).json({msg:"Added successfully"});
		}catch(err){
			res.status(500).send({msg:"Something went wrong"})
		}
		
	},
    remove: async(req,res)=>{
		try{
			await cartDao.remove(req.params.id)
            res.status(200).json({msg:"removed successfully"});
		}catch(err){
			res.status(500).send({msg:"Something went wrong"})
		}
		
	},
    get: async(req,res)=>{
		try{
			let data = await cartDao.get(req.body.email)
            res.status(200).json({data});
		}catch(err){
			res.status(500).send({msg:"Something went wrong"})
		}
		
	},
	getOrders: async(req,res)=>{
		try{
			let data = await cartDao.getOrders(req.body.email)
            res.status(200).json({data});
		}catch(err){
			res.status(500).send({msg:"Something went wrong"})
		}
	},
	placeOrder:async(req,res)=>{
		try{
			let data = await cartDao.placeOrders(req.body.email)
            res.status(200).json({data});
		}catch(err){
			res.status(500).send({msg:"Something went wrong"})
		}
	}
	

	
}

module.exports = cartController