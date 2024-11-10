import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core/services/reflector.service';
import { environment } from '@utils/constants';
import { httpPost } from '@utils/services/axios.service';
import { tokenService } from '@utils/services/token.service';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ApplicationMiddleware implements NestMiddleware {
  constructor(private reflector: Reflector) {}
  async use(req: Request | any, res: Response, next: NextFunction) {
    if (req.path === '/vocab-quiz/quiz/health' && req.method === 'GET') {
      return next();
    }

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('token_required');
    }
    tokenService.setToken(token);
    try {
      const introspectResponse = await httpPost(environment.iamURL, {
        accessToken: token,
      });
      console.log(introspectResponse);
      if (introspectResponse.responseBody.active) {
        return next();
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    } catch (error) {
      console.log(error.response);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
