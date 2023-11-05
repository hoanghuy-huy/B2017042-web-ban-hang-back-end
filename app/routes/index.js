const userRouter = require('./user')
const authRouter = require('./auth')
const productRouter = require('./product')
function route(app) {
   
   app.use('/',authRouter)
   app.use('/user',userRouter)
   app.use('/product',productRouter)
}

module.exports = route