export class APIResponse {
    static success<T>(data: T, message = 'Success') {
        return { status: true, code: 200, message, data };
    }

    static error(message = 'Something went wrong', code = 500, data: any = null) {
        return { status: false, code, message, data };
    }
}
