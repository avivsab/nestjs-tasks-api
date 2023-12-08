// TODO: adjust types/interfaces
const commonRequestBody = {
  description: 'Array of numbers',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          numbers: {
            type: 'array',
            items: {
              type: 'number',
            },
          },
        },
      },
    },
  },
};

const generateSwagger = (summary: string): any => ({
  summary,
  requestBody: commonRequestBody,
  responses: {
    200: { description: 'Task request accepted. Check status with the provided taskId.' },
  },
});

export const sumNumbersSwagger: any = generateSwagger('Execute Sum Task');
export const multiplyNumbersSwagger: any = generateSwagger('Execute Multiply Task');

export const listTasksSwagger: any = {
  summary: 'List Available Tasks',
  responses: {
    200: {
      description: 'List of available tasks.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              tasks: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    taskName: { type: 'string' },
                    status: { type: 'string' },
                    parameters: { type: 'array', items: { type: 'number' } },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const getTaskStatusSwagger: any = {
  summary: 'Get Task Status by ID',
  parameters: [
    {
      name: 'taskId',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
      },
      description: 'ID of the task',
    },
  ],
  responses: {
    200: {
      description: 'Task status.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: { type: 'string' },
            },
          },
        },
      },
    },
  },
};

export const getTaskResultSwagger: any = {
  summary: 'Get Task Result by ID',
  parameters: [
    {
      name: 'taskId',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
      },
      description: 'ID of the task',
    },
  ],
  responses: {
    200: {
      description: 'Task result.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              result: { type: 'number' },
            },
          },
        },
      },
    },
  },
};

export const executeTaskSwagger: any = {
  summary: 'Execute Task by Name with Parameters',
  parameters: [
    {
      name: 'taskName',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
      },
      description: 'Name of the task',
    },
  ],
  ...commonRequestBody,
  responses: {
    200: { description: 'Task request accepted. Check status with the provided taskId.' },
  },
};
