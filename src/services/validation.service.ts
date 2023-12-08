import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TaskOperations } from 'src/types/enums/enums';
import { isArray, isArrayNumeric, serializeParams } from 'src/utils/validation.utils';

@Injectable()
export class ValidationService {
    validateSumOps = (params: number[]) => {
        if (!isArray(params)) {
            throw new BadRequestException(`Invalid parameters for Sum task [expecting Array got ${typeof params}]`);
        }
        if (!isArrayNumeric(params)) {
            throw new BadRequestException(`Invalid value in params array for Sum task was detected: ${serializeParams(params)}`);
        }
    }

    validateMultiplyOps = (params: number[]) => {
        if (!isArray(params)) {
            throw new BadRequestException(`Invalid parameters for Sum task [expecting Array got ${typeof params}]`);
        }
        if (!isArrayNumeric(params)) {
            throw new BadRequestException(`Invalid value in params array for Sum task was detected: ${serializeParams(params)}`);
        }
    }

    validateRequestParams(path: string, params: any): void {
        switch (path) {
            case TaskOperations.Sum:
                this.validateSumOps(params);
                    break;
            case 'multiply':
                this.validateMultiplyOps(params);
                    break;
                    
            // Additional future operations will be added here

            default:
                throw new NotFoundException(`Unknown operation: ${path}`);
        }
    }
}
