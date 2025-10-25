import pino from 'pino';

export class Logger {
    private logger;

    constructor(context: string) {
        this.logger = pino({
            name: context,
            level: process.env.LOG_LEVEL || 'info',
            transport:
                process.env.NODE_ENV !== 'production'
                    ? { target: 'pino-pretty', options: { colorize: true } }
                    : undefined,
        });
    }

    info(msg: string, data?: any) {
        this.logger.info({ data }, msg);
    }

    error(msg: string, data?: any) {
        this.logger.error({ data }, msg);
    }

    warn(msg: string, data?: any) {
        this.logger.warn({ data }, msg);
    }
}
