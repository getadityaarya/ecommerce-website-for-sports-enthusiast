const addressDao = require('../dao/addressDao.js')


const addressController = {
	create: async(req,res)=>{	
		try{
			await addressDao.create(req.body)
            res.status(201).json({msg:"Added successfully"});
		}catch(err){
			res.status(500).send({msg:"Something went wrong"})
		}
		
	},
    get: async(req,res)=>{
		try{
			let data = await addressDao.get(req.body.email)
            res.status(201).json({data});
		}catch(err){
			res.status(500).send({msg:"Something went wrong"})
		}
		
	},
	update: async(req,res)=>{	
		try{
			await addressDao.update(req.body,req.params.id)
            res.status(201).json({msg:"updated successfully"});
		}catch(err){
			res.status(500).send({msg:"Something went wrong"})
		}
		
	},
	

	
}

module.exports = addressController