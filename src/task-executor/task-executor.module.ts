import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskExecutorController } from './task-executor.controller';
import { TaskExecutorService } from './task-executor.service';
import { DatabaseModule } from '../database/database.module';
import { DatabaseService } from '../database/database.service';
import { Task } from '../database/entities/task.entity';
import { ValidationService } from 'src/services/validation.service';
import { LoggerService } from 'src/services/logger.service';
import { RequestLoggingMiddleware } from 'src/middlewares/logging-request.middleware';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Task])],
  controllers: [TaskExecutorController],
  providers: [TaskExecutorService, DatabaseService, ValidationService, LoggerService],
})
export class TaskExecutorModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestLoggingMiddleware).forRoutes('*');
      }
}
