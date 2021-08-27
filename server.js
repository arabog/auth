require("dotenv").config({path: "./config.env"})
const express = require("express")
const authRoute = require("./routes/auth")
const connectDB = require("./config/db")
const errorHandler = require("./middleware/error")


// connect DB
connectDB()


const app = express()


// middleware
app.use(express.json())


// route
app.use("/api/auth", authRoute)


// Error Handler(Should)
app.use(errorHandler)


const PORT = process.env.PORT || 2000


const server = app.listen(
                    PORT, 
                    () => console.log(`Server running on port ${PORT}`
          )
)


process.on("unhandledRejection", (err, promise) => {
          console.log(`Logged Error: ${err}`)

          server.close( () => process.exit(1))
})