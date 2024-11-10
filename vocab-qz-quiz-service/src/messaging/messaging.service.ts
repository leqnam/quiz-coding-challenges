import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { environment } from '@utils/constants';
import * as amqp from 'amqplib';

@Injectable()
export class MessagingService {
  private client: ClientProxy;

  constructor() {}

  // Method to initialize a dynamic client proxy based on a dynamic queue name
  private createClientProxy(queueName: string): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [environment.rabbitmq], // Replace with your RabbitMQ URL
        queue: queueName,
        queueOptions: {
          durable: true,
          arguments: {
            'x-message-ttl': environment.rabbitmqTtl, // Message TTL in milliseconds
          },
        },
      },
    });
  }

  // Method to emit a message to a dynamic queue
  async emit(queueName?: string, message?: any): Promise<void> {
    this.client = this.createClientProxy(environment.rabbitmqName);
    await this.client.connect();
    this.client.emit(queueName || environment.rabbitmqName, message);
  }

  async overwriteQueue(queueName: string, message: any): Promise<void> {
    const connection = await amqp.connect(environment.rabbitmq);
    const channel = await connection.createChannel();
    await channel.assertQueue(environment.rabbitmqName, {
      durable: true,
      arguments: {
        'x-message-ttl': +environment.rabbitmqTtl,
      },
    });
    await channel.purgeQueue(environment.rabbitmqName);
    await this.emit(queueName, message);
    await channel.close();
    await connection.close();
  }
}
