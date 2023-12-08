import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './entities/task.entity';
import { serializeParams } from 'src/utils/validation.utils';
import { TaskStatuses } from 'src/types/enums/enums';

@Injectable()
export class DatabaseService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) { }

    async createTask(taskName: string, status: string, params: number[]): Promise<Task> {
        const serializedParams = serializeParams(params);
        const task = this.taskRepository.create({ taskName, status, parameters: params, parametersString: serializedParams });
        return this.taskRepository.save(task);
      }

      async findTaskByParameters(taskName: string, parameters: number[]): Promise<Task | undefined> {
        const serializedParams = serializeParams(parameters);
        return this.taskRepository.findOne({ where: { taskName, parametersString: serializedParams } });
      }
      

    async updateTaskResult(id: string, result: number): Promise<Task | undefined> {
        const task = await this.taskRepository.findOne({ where: { id } });
        if (task) {
            task.result = result;
            task.status = TaskStatuses.Completed;
            const updatedTask = await this.taskRepository.save(task);
            return updatedTask;
        }
        return undefined;
    }

    async updateTaskStatus(id: string, status: string): Promise<Task | undefined> {
        const task = await this.taskRepository.findOne({ where: { id } });
        if (task) {
            task.status = status;
            const updatedTask = await this.taskRepository.save(task);
            return updatedTask;
        }
        return undefined;
    }

    async listTasks(): Promise<string[]> {
        const distinctTasks = await this.taskRepository
            .createQueryBuilder("task")
            .select("DISTINCT task.taskName", "taskName")
            .getRawMany();

        return distinctTasks.map(task => task.taskName);
    }

    async getTaskStatus(taskId: string): Promise<string | undefined> {
        const task = await this.taskRepository.findOne({ where: { id: taskId } });
        if (task) {
            return task.status;
        }
        return undefined;
    }

    async getTaskResult(taskId: string): Promise<number | undefined> {
        const task = await this.taskRepository.findOne({ where: { id: taskId } });
        if (task) {
            return task.result;
        }
        return undefined;
    }
}
