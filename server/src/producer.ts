import amqplib from "amqplib"


const amqp  = require('amqplib')


export async function sendMessage()
{
    try{
        const connection = await amqp.connect('amqp://localhost')
        const channel = await connection.createChannel();

        const queue = "test_queue"
        await channel.assertQueue(queue , {durable: true});


        const message = 'hello from node js'
        channel.sendToQueue(queue, Buffer.from(message) , {persistent : true})


        console.log("message sent");

        setTimeout(() => {
            channel.close();
            connection.close();
            process.exit(0);

        },500 )
        

    }
    catch(error)
    {
        console.error('Error : ', error)
    }   
}