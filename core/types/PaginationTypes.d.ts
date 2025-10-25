/**
 * Request payload for pagination
 */
export interface PaginationRequest {
    page: number;
    pageSize: number;
}
/**
 * Result of pagination calculations
 */
export interface PaginationResult {
    limit: number;
    offset: number;
}
/**
 * Generic function signature for pagination utilities
 */
export type PaginationFunction = (page: number, pageSize: number) => PaginationResult;
/**
 * Pagination metadata type for convenience
 */
export interface PaginationInfo {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
}
