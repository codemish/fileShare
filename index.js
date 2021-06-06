const express=require('express');
const connectDb = require('./mongoDB')
const app=express()
const router=require('./routes/files')
const downloadPageRouter=require('./routes/show')
const downloadLinkRouter=require('./routes/download')
const upload=require('express-fileupload')
app.use(upload())
app.listen(3000,()=>{
    console.log("Started server")
})
app.use(express.json())
app.use('/',router)
app.use('/',downloadPageRouter)
app.use('/',downloadLinkRouter)
connectDb.then(()=>{
       console.log("Connected")
    // console.log("Connected")
}).catch((err)=>{
console.log(err)
})