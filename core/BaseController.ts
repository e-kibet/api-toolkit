import type { Request, Response, NextFunction } from 'express';
import { APIResponse } from './APIResponse';
import { Logger } from './Logger';

export abstract class BaseController<TService> {
    protected readonly service: TService;
    protected readonly logger: Logger;

    constructor(service: TService) {
        this.service = service;
        this.logger = new Logger(this.constructor.name);
    }

    protected async handle<T>(
        req: Request,
        res: Response,
        next: NextFunction,
        fn: () => Promise<T>
    ): Promise<void> {
        try {
            const data = await fn();
            res.status(200).json(APIResponse.success(data));
        } catch (error: any) {
            this.logger.error(`Controller error`, error);
            next(error);
        }
    }
}
