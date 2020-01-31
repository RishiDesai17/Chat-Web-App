const express = require('express');
const app = express();
const morgan =  require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const socketio = require('socket.io');

const publicDirectory = path.join(__dirname,'./public')

app.use(express.static(publicDirectory));

module.exports=app;