const {rabitmq_endpoint, iot_queue,iot_queue2} = require('./config');
let io = require('./socket');
var amqp = require('amqplib/callback_api');




amqp.connect(rabitmq_endpoint, function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    // channel.assertQueue(iot_queue2, {
    //   durable: true,
    // });


    
    console.log(
      ' [*] Waiting for IoT messages in %s. To exit press CTRL+C',
      iot_queue2
    );

    channel.consume(
      iot_queue,
      function(data) {
        let dt = JSON.parse(data.content.toString());
        console.log(' [x] Received Data from Queue 1:', dt);
        //Socket Trigger All Clients
        try{
        io.socket.emit('queue1', {message : dt});
        }catch(e){console.loq(e);}

        io.socket.on('another event',(data)=>{
          console.log(data);
        })
      },
      {
        noAck: true,
      },
      function(e) {
        console.log(e);
      }
    );

    channel.consume(
      iot_queue2,
      function(data){
      let dt=JSON.parse(data.content.toString());
      console.log('[x] Recieved data from Queue 2:',dt);
      io.socket.emit('queue2', {message : dt});
    },
    {
      noAck: true,
    },
    function(e) {
      console.log(e);
    }
    
    );


  });
});



// setInterval(function(){
//   io.socket.emit('queue1',{Message:Math.random()*10})
// },1000
// )


