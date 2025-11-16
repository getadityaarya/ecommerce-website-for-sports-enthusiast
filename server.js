const express = require('express')
const app = express()
const {PORT} = require('./config/config.js')
const authRouter = require('./routes/authentication.js')
const cartRouter = require('./routes/cart.js')
const addressRouter = require('./routes/address.js')
const path = require('path')
const productRouter = require('./routes/product.js')
const bodyParser = require('body-parser')

const authorizationMid = require('./middleware/authorization.js')

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/auth',authRouter)
app.use('/cart',authorizationMid,cartRouter)
app.use('/products',productRouter)
app.use('/address',authorizationMid,addressRouter)




module.exports = app.listen(PORT,()=>{
	console.log(`server started at ${PORT}`)
})

