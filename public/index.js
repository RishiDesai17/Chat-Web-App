//import {addMsg,getMsgs} from './utils/users'
const socket = io();

// socket.on('countupdated',(count)=>{
//     console.log("count has been updated",count)
// })

// document.querySelector('#increment').addEventListener('click',()=>{
//     console.log("clicked");
//     socket.emit('increment');
// })

const {username,room} = Qs.parse(location.search,{ignoreQueryPrefix: true})

// const autoScroll = () => {
//     const newMsg = messages.lastElementChild
// }

socket.on('msg',(msg)=>{
    console.log(msg);
    let x;
    if(username===msg.username){
        x = "#message-template-me"
    }else{
        x="#message-template"
    }
    const html=Mustache.render(document.querySelector(x).innerHTML,{
        message: msg.text,
        createdAt: moment(msg.createdAt).format('H:mm'),
        username: msg.username
    })
    document.querySelector("#messages").insertAdjacentHTML('beforeend',html);
})

socket.on('user',(msg)=>{
    console.log(msg);
    const html=Mustache.render(document.querySelector("#user-template").innerHTML,{
        message: msg.text,
        createdAt: moment(msg.createdAt).format('H:mm'),
        username: msg.username
    })
    document.querySelector("#messages").insertAdjacentHTML('beforeend',html);
})

socket.on('usersList',(data)=>{
    document.querySelector('#room-name').innerHTML=data.room
    // const html1=Mustache.render(document.querySelector('#get-message-template').innerHTML,{
    //     msgs: data.messages
    // })
    // document.querySelector("#messages").innerHTML = html1;
    const html=Mustache.render(document.querySelector('#members-template').innerHTML,{
        users: data.users
    })
    document.querySelector(".chat_people").innerHTML = html;
})

socket.on('locationMsg',(msg)=>{
    // if(username===msg.username){
    //     alert("to do");
    // }
    const html=Mustache.render(document.querySelector("#location-template").innerHTML,{
        link: msg.link,
        tstamp: moment(msg.tstamp).format('H:mm'),
        username: msg.username
    })
    document.querySelector("#messages").insertAdjacentHTML('beforeend',html);
})

document.querySelector("#submit").addEventListener('click',()=>{
    document.querySelector("#submit").disabled=true;
    document.querySelector("#send-location").disabled=true;
    socket.emit('sendMsg',document.querySelector('#input').value,(error)=>{
        document.querySelector("#submit").disabled=false;
        document.querySelector("#send-location").disabled=false;
        document.querySelector('#input').value=null;
        document.querySelector('#input').focus()
        if(error){
            return console.log(error);
        }
        console.log("Delivered");
    });
})

document.querySelector("#send-location").addEventListener('click',()=>{
    document.querySelector("#submit").disabled=true;
    document.querySelector("#send-location").disabled=true;
    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('location',{latitude: position.coords.latitude,longitude: position.coords.longitude},(error)=>{
            document.querySelector("#submit").disabled=false;
            document.querySelector("#send-location").disabled=false;
            if(error){
                return console.log(error);
            }
            console.log("Location shared!");
        });
    })
})

socket.emit('join',{username,room},(error)=>{
    if(error){
        location.href="/";
        alert(error);
    }
    //console.log(getMsgs(room));
})