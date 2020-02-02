const http = require('http');
const app = require('./app');
const socketio = require('socket.io');
const port = 3010;
const server = http.createServer(app);
const io = socketio(server);
const Filter = require('bad-words');
const {generateMsg,generateLoc} = require('./public/utils/messages')
const {addUser,removeUser,getUser,getUsersInRoom} = require('./public/utils/users')

//let count =0;
io.on('connection',(socket)=>{
    console.log('New Connection');
    // socket.emit("countupdated",count);
    // socket.on('increment',()=>{
    //     count++;
    //     //socket.emit('countupdated',count);
    //     io.emit('countupdated',count);
    // })
    socket.on('join',({username,room},cb)=>{
        const {error,user}= addUser({id:socket.id,username: username,room: room})
        if(error){
            cb(error) 
        }
        else{
            socket.join(user.room)
            socket.emit('msg',generateMsg("Admin","Welcome!!"));
            socket.broadcast.to(user.room).emit('user',generateMsg(null,`${user.username} has joined the chat!!`))
            cb();
        }
    })
    socket.on('sendMsg',(message,cb)=>{
        const user = getUser(socket.id);
        const filter = new Filter()
        if(filter.isProfane(message)){
            return cb("Profanity is not allowed");
        }
        io.to(user.room).emit('msg',generateMsg(user.username,message))
        cb();
    })
    socket.on('disconnect',()=>{
        const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit('user',generateMsg(null,`${user.username} has left!`))
        }
    })
    socket.on('location',(position,cb)=>{
        const user = getUser(socket.id);
        io.to(user.room).emit('locationMsg',generateLoc(user.username,`https://google.com/maps?q=${position.latitude},${position.longitude}`))
        cb()
    })
})

server.listen(port, ()=>{
    console.log("running on port "+port);
});