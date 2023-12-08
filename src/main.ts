import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as winston from 'winston';
import winstonConfig from './winston.config';
import { setupSwagger } from './swagger/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';


async function bootstrap() {
  const logger = winston.createLogger(winstonConfig);

  const app = await NestFactory.create(AppModule, { logger: ['debug', 'error', 'warn', 'log', 'verbose'] });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port =  3000;
  setupSwagger(app);
  const corsOptions: CorsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);

  await app.listen(port, () => {
    logger.log({level: 'info', message: `Listening at http://localhost:${port}/${globalPrefix}`});
  });
}
bootstrap();
