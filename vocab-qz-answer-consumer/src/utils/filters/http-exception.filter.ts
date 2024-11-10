import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const isShowDetailErrMsg = process.env.SHOW_DETAIL_ERRMSG;
    response.status(HttpStatus.OK).json({
      // response.json({
      // eslint-disable-next-line prettier/prettier
      message: (isShowDetailErrMsg=='true' ? exception?.getResponse()["message"] : exception?.message) || null,
      statusCode: status,
      timestamp: new Date().toISOString(),
    });
  }
}

/*
Usage: ping nam or ref:
    @Post()
    @UseFilters(new HttpExceptionFilter())
    async create(@Body() createCatDto: CreateCatDto) {
    throw new ForbiddenException();
    }

or:

    @UseFilters(new HttpExceptionFilter())
    export class CatsController {}

*/
