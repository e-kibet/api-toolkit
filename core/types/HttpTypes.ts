import type { Request, Response, NextFunction } from 'express';

/**
 * Base structure for all API responses
 */
export interface APIResponse<T = unknown> {
    status: boolean;
    code: number;
    message: string;
    data: T | null;
}

/**
 * Common HTTP handler signature
 */
export type RequestHandler<
    TReq extends Request = Request,
    TRes extends Response = Response
> = (req: TReq, res: TRes, next: NextFunction) => Promise<void> | void;

/**
 * Pagination metadata returned in paginated responses
 */
export interface PaginationMeta {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
}

/**
 * Shape of a paginated API response
 */
export interface PaginatedResponse<T = any> {
    items: T[];
    meta: PaginationMeta;
}

/**
 * Common query params accepted by most endpoints
 */
export interface QueryParams {
    page?: number;
    pageSize?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}
