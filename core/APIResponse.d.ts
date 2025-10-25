export declare class APIResponse {
    static success<T>(data: T, message?: string): {
        status: boolean;
        code: number;
        message: string;
        data: T;
    };
    static error(message?: string, code?: number, data?: any): {
        status: boolean;
        code: number;
        message: string;
        data: any;
    };
}
