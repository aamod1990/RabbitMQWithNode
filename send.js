const express = require('express')
const app = express()
const port = 3000
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel((err,ch)=>{
        var queue   = 'FirstQueue';
        var message = {type:2,content:"This is sample messgae example"};
        ch.assertQueue(queue,{durable:false});
        ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        console.log("Message Sent Successfully");
    })
    setTimeout(()=>{
        conn.close();
        process.exit(0);
    },500)
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))