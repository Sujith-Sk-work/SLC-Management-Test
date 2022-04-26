
const {port} = require('./config');
const app = require('express')();
const express = require("express");
const server = require('http').Server(app);
const io = require('socket.io')(server,{
  allowEIO3: true // false by default
});
var amqp = require('amqplib/callback_api');
const {rabitmq_endpoint, iot_queue,iot_queue2} = require('./config');


// Static files
app.use(express.static("public"));

//index file
app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/config/index.html');
});

//websocket


module.exports = {

    socket : any = io.on('connection', (socket) => {
        console.log('User Socket Connected');
        socket.on("disconnect", () => console.log(`${socket.id} User disconnected.`));

        amqp.connect(rabitmq_endpoint, function(error0, connection) {
          if (error0) {
            throw error0;
          }
          connection.createChannel(function(error1, channel) {
            if (error1) {
              throw error1;
            }
          
            socket.on('Turn-On',(data)=>{
              channel.publish('amq.topic','sujith',Buffer.from(JSON.stringify(data)));
            
            })
            
            socket.on('Turn-Off',(data)=>{
              channel.publish('amq.topic','sujith',Buffer.from(JSON.stringify(data)));
            })

          })
            
          });
    })
};

server.listen(port, ()=> console.log("Connected "));