export function isArrayNumeric(arr: number[]): boolean {
    // In real world app I will implement more generic isNumeric fn and will  
    // check the type (array, obj, primitive value and create handler for each type, also throw wrong set of params for logging)
    return arr.every((num) => typeof +num === 'number' && !isNaN(num));
  }

  export function isArray(param: any): boolean {
    return Array.isArray(param);
  }

  export function serializeParams(params: any): string {
    return JSON.stringify(params);
  }

  export function deserializeParams (params: string): {} {
    return JSON.parse(params);
  }