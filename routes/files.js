const express=require("express");
const multer =require('multer')
const router=express.Router()
const upload=require('express-fileupload')
const path=require('path')
const File=require('../models/schema')
const {v4:uuid4} =require('uuid')
router.route('/api/files').post((req,res)=>{
   if(req.files)
   {
        var file=req.files.image
        var filename=file.name;
        console.log(file)
          console.log("Pink")
        file.mv('./uploads/'+filename, async(err)=>{
            if(err)
            {
                res.send("ERROR")
            }
            else{
                console.log("Done")
              const dataInput=new File({
                  filename:filename,
                  uuid:uuid4(),
                  path:"uploads/"+filename,
                  size:file.size
              })
              const response= await dataInput.save();
              res.json({file:"http://localhost:3000/files/download/"+response.uuid })  
            }
        })
   }
   else{
      
       res.send("Not found")
   } 
})

router.route('/api/files/send').post(async (req, res) => {
  const { uuid, emailTo, emailFrom } = req.body;
  if(!uuid || !emailTo || !emailFrom) {
      return res.status(422).send({ error: 'All fields are required except expiry.'});
  }
  // Get data from db 
  try {
    const file = await File.findOne({ uuid: uuid });
    if(file.sender) {
      return res.status(422).send({ error: 'Email already sent once.'});
    }
    file.sender = emailFrom;
    file.receiver = emailTo;
    const response = await file.save();
    const sendMail = require('../services/mailServices');
    sendMail({
      from: emailFrom,
      to: emailTo,
      subject: 'fileShare - Share Files on the go',
      text: `${emailFrom} shared a file with you.`,
      html: require('../services/emailTemplate')({
                emailFrom, 
                downloadLink:"http://5c302872d2b6.ngrok.io/files/download/"+file.uuid ,
                size: parseInt(file.size/1000) + ' KB',
                expires: '24 hours'
            })
    }).then(() => {
      return res.json({success: true});
    }).catch(err => {
      return res.status(500).json({error: 'Error in email sending.'});
    });
} catch(err) {
    console.log(err)
  return res.status(500).json({ error: 'Something went wrong.'});
}

});
module.exports=router