export declare class MessagingService {
    private client;
    constructor();
    private createClientProxy;
    emit(queueName?: string, message?: any): Promise<void>;
    overwriteQueue(queueName: string, message: any): Promise<void>;
}
