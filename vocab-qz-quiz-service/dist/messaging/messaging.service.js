"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const constants_1 = require("../utils/constants");
const amqp = require("amqplib");
let MessagingService = class MessagingService {
    constructor() { }
    createClientProxy(queueName) {
        return microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: [constants_1.environment.rabbitmq],
                queue: queueName,
                queueOptions: {
                    durable: true,
                    arguments: {
                        'x-message-ttl': constants_1.environment.rabbitmqTtl,
                    },
                },
            },
        });
    }
    async emit(queueName, message) {
        this.client = this.createClientProxy(constants_1.environment.rabbitmqName);
        await this.client.connect();
        this.client.emit(queueName || constants_1.environment.rabbitmqName, message);
    }
    async overwriteQueue(queueName, message) {
        const connection = await amqp.connect(constants_1.environment.rabbitmq);
        const channel = await connection.createChannel();
        await channel.assertQueue(constants_1.environment.rabbitmqName, {
            durable: true,
            arguments: {
                'x-message-ttl': +constants_1.environment.rabbitmqTtl,
            },
        });
        await channel.purgeQueue(constants_1.environment.rabbitmqName);
        await this.emit(queueName, message);
        await channel.close();
        await connection.close();
    }
};
exports.MessagingService = MessagingService;
exports.MessagingService = MessagingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MessagingService);
//# sourceMappingURL=messaging.service.js.map