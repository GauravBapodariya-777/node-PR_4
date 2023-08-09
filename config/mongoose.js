const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/node-9am");

const db = mongoose.connection;

db.on('connected',(err)=>{
    if(err){
        console.log("Db is not connected");
    }
    console.log("DB is start");
})

module.exports = db;
