const { urlencoded } = require("express")
const express = require("express")
const PORT = 5000
const {errorHandler} = require("./middleware/errorMiddleware")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/goals',require('./routes/goalsRoutes'))
app.use(errorHandler)
app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))