const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const morgan = require('morgan')
const router = require('./app/routes')
const cookieParser = require('cookie-parser');
const path = require('path')

app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser());
app.use(cors())
app.use(express.json())
app.use(bodyParser.json({limit:"50mb"}))
app.use(morgan("common"))

dotenv.config()

// router
router(app)

mongoose.connect((process.env.MONGODB_URL), {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.listen(3000, () => {
    console.log("Server is running...")
})

module.exports = app