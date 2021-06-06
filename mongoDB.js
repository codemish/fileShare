const mongoose=require('mongoose')

 const connect=   mongoose.connect("mongodb+srv://fileShare:ufenXuk1gSRLIfMI@cluster0.ynkib.mongodb.net/fileShare?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });   

module.exports = connect;
