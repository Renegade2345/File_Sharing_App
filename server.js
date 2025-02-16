const express = require ("express")
const router = require("./routes/router")
const {getNetworkIpAddress }= require("./service/Network")
const {initIO} = require("./service/Socket")
const { files } = require("./db");


 const ipAddress = getNetworkIpAddress()
 console.log(ipAddress)

const app = express()
const port = 3000

// Middleware
app.use("/", express.static("./public"))
app.use("/uploads", express.static("./uploads"))

// Routes
app.use("/api/v1", router)


const server = app.listen(port, ()=>{
    if(!ipAddress){
        console.info("Server stopped")
        process.exit(0)
    }

    console.info(`Server is running on port ${port}`)
    console.info(`Serve connection address for file sharing is http://${ipAddress}:${port}`)

})

// socket connection
initIO(server)