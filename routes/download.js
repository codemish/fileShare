const express=require("express");
const File=require('../models/schema');
const router=express.Router()
router.route('/files/download/:uuid')
.get(async(req,res)=>{
 try {
   const file=await File.findOne({uuid:req.params.uuid})
   if(!file)
   {
       res.setHeader(200);
       res.send("Error")
   } 
   else{
    const dir=__dirname
       const filePath=`${dir}/../${file.path}`
       console.log(filePath)
       res.download(filePath);
   } 
 } catch (error) {
     
 }   
})
module.exports=router