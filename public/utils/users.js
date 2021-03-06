const users = [];
const messages = [];
//users.length=2;

const getMsgs = (room) => {
    return messages.filter((msg)=>{
        return msg.room===room
    })
}

const addMsg = ({room,username,message,createdAt}) => {
    messages.push({room,username,message,createdAt})
}

const addUser = ({id,username,room}) => {
    username=username.trim().toLowerCase()
    room=room.trim().toLowerCase()
    if(!username||!room){
        return{
            error: 'Username and room required'
        }
    }
    const existingUser=users.find((user)=>{
        return user.room===room && user.username===username
    })
    if(existingUser){
        return{
            error: 'Username in use already'
        }
    }
    const user = {id,username,room}
    users.push(user);
    return {user}
}

const removeUser = (id) => {
    const index = users.findIndex((user)=>{
        return user.id===id;
    })
    if(index!==-1){
        return users.splice(index,1)[0];
    }    
}

const getUser = (id) => {
    return users.find((user)=>{
        return user.id===id;
    })
}

const getUsersInRoom = (room) => {
    return users.filter((users)=>{
        return users.room===room
    })
}

module.exports = {addUser,removeUser,getUser,getUsersInRoom,addMsg,getMsgs}