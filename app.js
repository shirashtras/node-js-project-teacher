const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const authenticationRouter =require('./routes/authenticationRoutes')
const productRoutes = require('./routes/productRoutes')
const categoryRoutes = require('./routes/categoryRoutes')

const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express()

app.use(express.json())

app.use('/', authenticationRouter)
app.use('/products', productRoutes)
app.use('/categories', categoryRoutes)
app.use(errorMiddleware)

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    )
  })
  .catch(err => {
    console.error('DB connection failed:', err.message)
  })