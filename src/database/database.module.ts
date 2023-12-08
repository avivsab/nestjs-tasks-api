import { Module } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'tasks.db',
    entities: [Task],
    synchronize: true,
  })],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
