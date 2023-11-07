const userRouter = require('./user')
const authRouter = require('./auth')
const productRouter = require('./product')
function route(app) {
   
   app.use('/',authRouter)
   app.use('/api/users',userRouter)
   app.use('/api/products',productRouter)
}

module.exports = route