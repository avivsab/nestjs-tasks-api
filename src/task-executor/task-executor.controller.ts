import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskExecutorService } from './task-executor.service';
import { sumNumbersSwagger, multiplyNumbersSwagger, listTasksSwagger, getTaskStatusSwagger, executeTaskSwagger, getTaskResultSwagger } from '../swagger/task-executor.swagger';
import { ValidationService } from 'src/services/validation.service';
import { LoggerService } from 'src/services/logger.service';
import { ApiOperations, TaskOperations } from 'src/types/enums/enums';

@ApiTags('tasks')
@Controller('tasks')
export class TaskExecutorController {
    constructor(
        private readonly taskExecutorService: TaskExecutorService,
        private readonly logger: LoggerService,
        private readonly validationService: ValidationService,
    ) { }

    @Post('sum')
    @ApiOperation(sumNumbersSwagger)
    @ApiResponse(sumNumbersSwagger.responses, { overrideExisting: true })
    async sumNumbers(@Body() params: { numbers: number[] }): Promise<{ taskId: string }> {
        try {
            this.validationService.validateRequestParams(TaskOperations.Sum, params.numbers);
            const taskResponse = await this.taskExecutorService.sumNumbers(params.numbers);
            const { taskId } = taskResponse;
            this.logger.log('Sum task request accepted. Task Details: ' + taskId);
            return { taskId };
        } catch (error) {
            this.logger.error('Error executing Sum task:', error.message, error.stack);
            throw error;
        }
    }

    @Post('multiply')
    @ApiOperation(multiplyNumbersSwagger)
    @ApiResponse(multiplyNumbersSwagger.responses)
    async multiplyNumbers(@Body() params: { numbers: any }): Promise<{ taskId: string }> {
        try {
            this.validationService.validateRequestParams(TaskOperations.Multiply, params.numbers);
            const taskRes = await this.taskExecutorService.multiplyNumbers(params.numbers);
            const { taskId } = taskRes;
            this.logger.log('Multiply task request accepted. Task Details:', taskId);
            return { taskId };
        } catch (error) {
            this.logger.error('Error executing Multiply task:', error.message, error.stack);
            throw error;
        }
    }
    @Get()
    @ApiOperation(listTasksSwagger)
    @ApiResponse(listTasksSwagger.responses)
    async listTasks(): Promise<{ tasks: any[] }> {
        try {
            const tasks = await this.taskExecutorService.listTasks();
            return { tasks };
        } catch (error) {
            this.logger.error('Error listing tasks:', error.message, error.stack);
            throw error;
        }
    }

    @Get(':taskId/status')
    @ApiOperation(getTaskStatusSwagger)
    @ApiResponse(getTaskStatusSwagger.responses)
    async getTaskStatus(@Param('taskId') taskId: string): Promise<{ status: string }> {
        try {
            const status = await this.taskExecutorService.getTaskStatus(taskId);
            this.logger.log(`${ApiOperations.GetTaskStatus} with ${taskId} accepted and processed}`)
            return { status };
        } catch (error) {
            this.logger.error(`Error getting status for task ID ${taskId}:`, error.message, error.stack);
            throw error;
        }
    }

    @Get(':taskId/result')
    @ApiOperation(getTaskResultSwagger)
    @ApiResponse(getTaskResultSwagger.responses)
    async getTaskResult(@Param('taskId') taskId: string): Promise<{ result?: number }> {
        try {
            const result = await this.taskExecutorService.getTaskResult(taskId);
            this.logger.log(`${ApiOperations.GetTaskResult} with ${taskId} accepted and processed}`)
            return { result };
        } catch (error) {
            this.logger.error(`Error getting result for task ID ${taskId}:`, error.message, error.stack);
            throw error;
        }
    }

    @Post(':taskName/execute')
    @ApiOperation(executeTaskSwagger)
    @ApiResponse(executeTaskSwagger.responses)
    async executeTaskByName(@Param('taskName') taskName: string, @Body() params: { numbers: number[] }): Promise<{ taskId: string }> {
        try {
            this.validationService.validateRequestParams(taskName, params.numbers);
            const taskResponse = await this.taskExecutorService.executeTaskByName(taskName, params.numbers);
            const { taskId } = taskResponse;
            this.logger.log(`${taskName} task request accepted. Task ID: ${taskId}`);
            return { taskId };
        } catch (error) {
            this.logger.error(`Error executing ${taskName} task:`, error.message, error.stack);
            throw error;
        }
    }
}
