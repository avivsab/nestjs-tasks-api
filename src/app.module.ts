import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskExecutorModule } from './task-executor/task-executor.module'
import { Task } from './database/entities/task.entity';

@Module({
    imports: [TaskExecutorModule],
    controllers: [AppController],
    providers: [AppService],
})
    export class AppModule { }
