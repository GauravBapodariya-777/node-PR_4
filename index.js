const express = require('express');
const port = 7777;
const app = express();
const db = require('./config/mongoose');
const adminTable = require('./models/adminTbl');
const path = require('path')

app.use(express.urlencoded());
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    adminTable.find({}).then((record)=>{
        return res.render('form',{ record });
    }).catch((err)=>{
        console.log(err);
        return false;
    }) 
})
app.post('/insertData',(req,res)=>{
   const {name,price,author,gender,hobby,page,phone} = req.body;
   adminTable.create({
        name : name,
        price : price,
        author : author,
        page : page,
   }).then((success)=>{ 
        console.log("record successfully insert");
        return res.redirect('back')
   }).catch((err)=>{
    console.log(err);
        return false;
   })
})
app.get('/deleteData',(req,res)=>{
    let id = req.query.id;
    adminTable.findByIdAndDelete(id).then((data)=>{
        console.log("Record successfully delete");
        return res.redirect('/');
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})
app.get('/editData',(req,res)=>{
    let id = req.query.id;
    adminTable.findById(id).then((data)=>{
        return res.render('edit',{ single : data })
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})
app.post('/updateData',(req,res)=>{
    let editid = req.body.editid;
    const {name,price,author,gender,hobby,page,phone} = req.body;
    adminTable.findByIdAndUpdate(editid,{
        name : name,
        price : price,
        author : author,
        page : page,
    }).then((success)=>{
       console.log("Record successfully update");
       return res.redirect('/'); 
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})

app.listen(port,(err)=>{
    if(err){
        console.log("Server is not start");
        return false
    }
    console.log("server is start on port :- "+port);
})
