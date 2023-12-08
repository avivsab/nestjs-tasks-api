import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { LoggerService } from 'src/services/logger.service';
import { TaskStatuses, TaskOperations } from 'src/types/enums/enums';

@Injectable()
export class TaskExecutorService {

    constructor(private readonly databaseService: DatabaseService, private readonly logger: LoggerService) { }

    async executeTaskByName(taskName: string, parameters: number[]): Promise<{ taskId: string; result?: number }> {
        const existingTask = await this.databaseService.findTaskByParameters(taskName, parameters);

        if (existingTask) {
            return { taskId: existingTask.id, result: existingTask.result };
        }

        const newTask = await this.databaseService.createTask(taskName, TaskStatuses.Pending, parameters);

        try {
            const result = await this.performTask(taskName, parameters);
            await this.databaseService.updateTaskResult(newTask.id, result);
            return { taskId: newTask.id, result };
        } catch (error) {
            await this.databaseService.updateTaskStatus(newTask.id, TaskStatuses.Failed);
            this.logger.error(`Error performing task ${taskName}: ${error.message}`);
            throw error;
        }
    }

    async sumNumbers(numbers: number[]): Promise<{ taskId: string; result?: number }> {
        const existingTask = await this.databaseService.findTaskByParameters(TaskOperations.Sum, numbers);

        if (existingTask) {
            this.logger.log(`Notice: ${existingTask.parameters} of sum operation [Task ID: ${existingTask.id}] 
                                was requested again and was send directly from the DB` )
            return { taskId: existingTask.id, result: existingTask.result };
        }

        const newTask = await this.databaseService.createTask(TaskOperations.Sum, TaskStatuses.Pending, numbers);

        try {
            const result = await this.performTask(TaskOperations.Sum, numbers);
            await this.databaseService.updateTaskResult(newTask.id, result);
            return { taskId: newTask.id, result };
        } catch (error) {
            await this.databaseService.updateTaskStatus(newTask.id, TaskStatuses.Failed);
            this.logger.error(`Error performing Sum task: ${error.message}`);
            throw error;
        }
    }

    async multiplyNumbers(numbers: number[]): Promise<{ taskId: string; result?: number }> {
        const existingTask = await this.databaseService.findTaskByParameters(TaskOperations.Multiply, numbers);

        if (existingTask) {
            return { taskId: existingTask.id, result: existingTask.result };
        }

        const newTask = await this.databaseService.createTask(TaskOperations.Multiply, TaskStatuses.Pending, numbers);
        try {
            const result = await this.performTask(TaskOperations.Multiply, numbers);
            await this.databaseService.updateTaskResult(newTask.id, result);
            return { taskId: newTask.id, result };
        } catch (error) {
            await this.databaseService.updateTaskStatus(newTask.id, 'Failed');
            this.logger.error(`Error performing Multiply task: ${error.message}`);
            throw error;
        }
    }

    private async performTask(taskName: string, parameters: number[]): Promise<number> {
        // will be implement with a handler for each operation (task) assuming that 
        // real scenario will be more complex with wider range of tasks
        const [result] = taskName.toLowerCase() === TaskOperations.Multiply ? [parameters.reduce((a, b) => a * b)] : [parameters.reduce((a, b) => a + b)];
        return result;
    }

    async getTaskResult(taskId: string) {
        return this.databaseService.getTaskResult(taskId);
    }
    async getTaskStatus(taskId: string) {
        const status = await this.databaseService.getTaskStatus(taskId);
        if (!status) {
            throw new NotFoundException(`Task with ID ${taskId} not found.`);
        }
        return status;
    }
    async listTasks() {
        return this.databaseService.listTasks();
    }
}
