import { NestMiddleware } from '@nestjs/common';
import { Reflector } from '@nestjs/core/services/reflector.service';
import { NextFunction, Request, Response } from 'express';
export declare class ApplicationMiddleware implements NestMiddleware {
    private reflector;
    constructor(reflector: Reflector);
    use(req: Request | any, res: Response, next: NextFunction): Promise<void>;
}
