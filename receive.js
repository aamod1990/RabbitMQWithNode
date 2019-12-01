const express = require('express')
const app = express()
const port = 3001
var amqp = require('amqplib/callback_api');
amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel((err,ch)=>{
        var queue   = 'FirstQueue';
        ch.assertQueue(queue,{durable:false});
        console.log(`waiting for message in ${queue}`);
        ch.consume(queue,(mess)=>{
            console.log(`Receive ${mess.content}`);
        },{noAck:true});
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))