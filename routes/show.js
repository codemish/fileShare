const express=require("express");
const File=require('../models/schema');
const router=express.Router()
router.route('/files/:uuid')
.get( async(req,res)=>{
    try{
        console.log(req.params.uuid)
        const file=await File.findOne({uuid:req.params.uuid})
        if(!file)
        {
            res.send("Link Expired")
        }
        else{
            res.json({
             uuid:file.uuid,
             filename:file.filename,
             size:file.size,
             downloadLink: "http://localhost:3000/files/download/"+file.uuid
            })
        }
    }
  catch(err){
    res.send("ERROR")
  }
})
module.exports=router