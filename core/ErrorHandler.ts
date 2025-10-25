import type { Request, Response, NextFunction } from 'express';
import { APIResponse } from './APIResponse';
import { Logger } from './Logger';

export const ErrorHandler = (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    const logger = new Logger('ErrorHandler');
    logger.error(err.message, err.stack);
    const code = err.statusCode || 500;
    res.status(code).json(APIResponse.error(err.message, code));
};
