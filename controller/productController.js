const productDao = require('../dao/productDao.js')

const productController = {
	getAll: async(req,res)=>{
		try{

		   const data = await productDao.getAll()
           if(data==null)throw new Error()
           else res.status(200).json({data})
		}catch(err){
			res.status(500).send({msg:"Something went wrong"})
		}
		
	},
	getById: async(req,res)=>{
		try{

		   const data = await productDao.getById(req.params.id)
           if(data==null)throw new Error()
           else res.status(200).json({data})
		}catch(err){
			res.status(500).send({msg:"Something went wrong"})
		}
		
	}
}

module.exports = productController