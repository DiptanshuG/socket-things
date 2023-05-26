// this file is the entry point for the server

const express=require('express');
const app=express();
const http=require('http');
const cors=require('cors'); 
const { Server } = require("socket.io");
app.use(cors())


const server= http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:'http://localhost:3001',
        methods:['GET','POST']
    }
});

io.on('connection',  (socket)=> {
    console.log(socket.id);

    socket.on('joinRoom',({room,message})=>{
        socket.join(room);
        console.log(`user with ID:${socket.id} joined room ${room}`)
        console.log('joined room');
        io.to(room).emit('message',message);
    })

    socket.on('sendMessage',(data)=>{
        console.log(data,"bro");
        socket.to(data.room).emit('message_received',data.message);
    })

    socket.on('disconnect', function () {
        console.log('Socket disconnected',socket.id);
    });
});



server.listen(3000,()=>{
    console.log('listening on port 3000');
})