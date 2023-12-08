export enum TaskStatuses {
    Pending = 'Pending',
    Completed = 'Completed',
    Failed = 'Failed',
  }

  export enum TaskOperations {
    Sum = 'sum',
    Multiply = 'multiply',
  }
  
  export enum ApiOperations {
    Sum = 'sum',
    Multiply = 'multiply',
    ListTasks = 'listTasks',
    GetTaskStatus = 'getTaskStatus',
    GetTaskResult = 'getTaskResult',
    ExecuteTask = 'executeTask',
  }