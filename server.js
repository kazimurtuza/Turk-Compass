const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const connectDb = require('./config/db')


// dot en configuration
dotenv.config()

// DB connection 
connectDb()


// rest object 
const app =express()

// middleware

app.use(cors())
app.use(express.json())

// using morgan we can see all router hit information in console terminal
app.use(morgan("dev"))


// route
// url=>http://localhost:8080

app.use("/api/v1/test",require("./routes/testRoute"))
app.use("/api/v1/auth",require("./routes/authRoutes"))
app.use("/api/v1/package",require("./routes/packageRoutes"))
app.use("/api/v1/payment",require("./routes/paymentRoutes"))

// job
app.use("/api/v1/job",require("./routes/jobRoutes"))


app.get("/",(req,res)=>{
    return res.status(200).send("<h1> Welcome to turk compass server app </h1>")
})

// port 
const PORT=process.env.PORT || 8080;

//LISTEN
app.listen(PORT, ()=>{
        console.log(`server  running on ${PORT}`)
})