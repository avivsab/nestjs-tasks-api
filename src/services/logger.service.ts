import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import winstonConfig from '../winston.config';

const logger = winston.createLogger(winstonConfig);

@Injectable()
export class LoggerService {
  log(message: string, context?: string) {
    logger.log('info', message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    logger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    logger.verbose(message, { context });
  }
}
