const express = require('express');
const app = express();
const morgan =  require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const socketio = require('socket.io');

const publicDirectory = path.join(__dirname,'./public')

app.use(express.static(publicDirectory));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');//Origin, X-Requested-With, Content-Type, Accept, Authorization
    if(req.method==='OPTIONS'){
      res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
})

module.exports=app;