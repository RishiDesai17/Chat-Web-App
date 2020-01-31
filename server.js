const http = require('http');
const app = require('./app');
const socketio = require('socket.io');
const port = 3010;
const server = http.createServer(app);
const io = socketio(server);
const Filter = require('bad-words');
const {generateMsg,generateLoc} = require('./public/utils/messages')

//let count =0;
io.on('connection',(socket)=>{
    console.log('New Connection');
    // socket.emit("countupdated",count);
    // socket.on('increment',()=>{
    //     count++;
    //     //socket.emit('countupdated',count);
    //     io.emit('countupdated',count);
    // })
    socket.emit('msg',generateMsg("Welcome!!"));
    socket.broadcast.emit('user',generateMsg("NEW USER!!"))
    socket.on('sendMsg',(message,cb)=>{
        const filter = new Filter()
        if(filter.isProfane(message)){
            return cb("Profanity is not allowed");
        }
        io.emit('msg',generateMsg(message))
        cb();
    })
    socket.on('disconnect',()=>{
        io.emit('user',generateMsg('A user has left!'))
    })
    socket.on('location',(position,cb)=>{
        socket.broadcast.emit('locationMsg',generateLoc(`https://google.com/maps?q=${position.latitude},${position.longitude}`))
        cb()
    })

})

server.listen(port, ()=>{
    console.log("running on port "+port);
});