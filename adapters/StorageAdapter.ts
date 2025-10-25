/**
 * Standard interface for file storage adapters
 * Ensures consistency across S3, GCS, MinIO, etc.
 */
export interface StorageAdapter {
    /**
     * Uploads a file buffer to storage.
     * @param key - the destination key/path
     * @param buffer - file data
     * @param contentType - MIME type
     * @returns - the file URI (e.g., s3://bucket/key)
     */
    uploadBuffer(key: string, buffer: Buffer, contentType?: string): Promise<string>;

    /**
     * Generates a signed URL for uploading a file directly to storage.
     * @param key - file key
     * @param expiresIn - time in seconds
     * @param contentType - MIME type
     * @returns - a signed upload URL
     */
    generateUploadUrl?(key: string, expiresIn?: number, contentType?: string): Promise<string>;

    /**
     * Generates a signed URL for downloading a file.
     * @param key - file key
     * @param expiresIn - time in seconds
     * @returns - a signed download URL
     */
    generateDownloadUrl?(key: string, expiresIn?: number): Promise<string>;

    /**
     * Deletes a file from storage.
     * @param key - file key
     * @returns - boolean indicating success
     */
    deleteObject(key: string): Promise<boolean>;
}
