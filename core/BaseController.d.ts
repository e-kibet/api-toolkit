import type { Request, Response, NextFunction } from 'express';
import { Logger } from './Logger';
export declare abstract class BaseController<TService> {
    protected readonly service: TService;
    protected readonly logger: Logger;
    constructor(service: TService);
    protected handle<T>(req: Request, res: Response, next: NextFunction, fn: () => Promise<T>): Promise<void>;
}
