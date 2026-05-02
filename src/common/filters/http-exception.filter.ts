import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Преобразует HTTP-исключения и неизвестные ошибки в единое JSON-тело ответа.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const path: string = request.url ?? '';
    const timestamp: string = new Date().toISOString();

    if (exception instanceof HttpException) {
      const status: number = exception.getStatus();
      const exceptionResponse: string | object = exception.getResponse();

      let message: string | string[];
      let errorName: string;

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
        errorName = HttpStatus[status] ?? 'Error';
      } else {
        const body = exceptionResponse as {
          readonly message?: string | string[];
          readonly error?: string;
        };

        message = body.message ?? exception.message;
        errorName =
          typeof body.error === 'string'
            ? body.error
            : (HttpStatus[status] ?? 'Error');
      }

      response.status(status).json({
        statusCode: status,
        message,
        error: errorName,
        timestamp,
        path,
      });

      return;
    }

    this.logger.error(
      exception instanceof Error ? exception.stack : String(exception),
    );

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      error: 'Internal Server Error',
      timestamp,
      path,
    });
  }
}
