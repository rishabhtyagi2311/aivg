import pika 
import json 

def callback(ch, method, properties, body):
    """called when a message arrives"""
    message = body.decode('utf-8')
    print(f"recieved : {message}")
    ch.basic_ack(delivery_tag = method.delivery_tag)


def consume_messages():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()


    queue = 'test_queue'
    channel.queue_declare(queue=queue, durable=True)

    channel.basic_consume(queue=queue, on_message_callback = callback)
    print(f'waiting for messafes from "{queue}" ....')

    channel.start_consuming()


if __name__ == '__main__':
    consume_messages()


