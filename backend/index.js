const express = require("express");
const cors = require("cors");
const app = express()
const mogoDB = require("./model/mongoDB")
const port = process.env.PORT || 5000;

// middleware 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}));
// app router
const   adminRoutes  =  require("./routers/admin.router")
const userRouters = require("./routers/user.router")



app.use("/api",adminRoutes)
app.use("/api",userRouters)



app.get("/", (req,res)=>{
    res.send("server is running now....")
})

app.listen(port, ()=> console.log(`your server is running at http://localhost:${port}/`))