import { Token } from '@auth/interfaces/token';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.setHeader('X-Powered-By', 'NREADY LAB');
    const token = req.headers.authorization?.split(' ')[1];
    if (token && token != 'null') {
      const jwtService = new JwtService();
      const decoded = jwtService.decode(token) as Token;
      req['currentUser'] = decoded.id || '';
    } else {
      req['currentUser'] = '';
    }
    next();
  }
}
