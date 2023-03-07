const { urlencoded } = require("express")
const express = require("express")
const PORT = 5000
const {errorHandler} = require("./middleware/errorMiddleware")
const connectDB = require("./db/db")
const app = express()
connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/goals',require('./routes/goalsRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
app.use(errorHandler)
app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))