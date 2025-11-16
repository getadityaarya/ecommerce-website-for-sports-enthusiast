const userDao = require('../dao/userDao.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET_KEY} = require('../config/config.js')

const authController = {
	signup: async(req,res)=>{
		try{
			const {username, email, password} = req.body
			console.log(username, email, password)
			if(email && password){
					const exists = await userDao.findByEmail(email)
					if(exists){
						return res.status(400).send({msg:"User Already Exist"})
					}
						
					const salt = await bcrypt.genSalt(10);
				    const pwd = await bcrypt.hash(password, salt)
				    const data = await userDao.create({
				    	username,
				    	email: email, 
				    	password: pwd
				    })
				    res.status(201).send({msg:"User Created"})
			}
		}catch(err){
			res.status(500).send({msg:"Something went wrong"})
		}
		
	},
	login:async(req,res)=>{
		try{

			const {email, password} = req.body
			if(email && password){
					const userInfo = await userDao.findByEmail(email)
				
				    if(userInfo===null)return res.status(400).send({msg:"No such user exist"})
					const salt = await bcrypt.genSalt(10);
				    const pwd = await bcrypt.hash(password, salt)

				    const isMatch = await bcrypt.compare(password, userInfo.password)
				     if(isMatch){
				     	const token = jwt.sign({
				     		email
				     	},JWT_SECRET_KEY,{ expiresIn: '1h' })

				    	res.status(200).send({token})
				    }else{
				    	return res.status(400).send({msg:"User and password does not match"})
				    }
			}
			}
		catch(err){
			res.status(500).send({msg:"Something went wrong"})
		}

	}
}

module.exports = authController