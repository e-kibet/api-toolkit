export declare class Logger {
    private logger;
    constructor(context: string);
    info(msg: string, data?: any): void;
    error(msg: string, data?: any): void;
    warn(msg: string, data?: any): void;
}
