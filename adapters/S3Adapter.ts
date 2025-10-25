import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Logger } from '../core/Logger';

export interface S3Config {
    region: string;
    bucket: string;
    accessKeyId?: string;
    secretAccessKey?: string;
    endpoint?: string; // optional for custom or localstack endpoints
}

export class S3Adapter {
    private client: S3Client;
    private logger = new Logger('S3Adapter');
    private bucket: string;

    constructor(config: S3Config) {
        const { region, accessKeyId, secretAccessKey, endpoint, bucket } = config;

        this.client = new S3Client({
            region,
            endpoint,
            credentials: accessKeyId && secretAccessKey
                ? { accessKeyId, secretAccessKey }
                : undefined,
        });

        this.bucket = bucket;
        this.logger.info(`S3 client initialized for bucket: ${bucket}`);
    }

    /**
     * Upload a buffer to S3
     */
    async uploadBuffer(
        key: string,
        buffer: Buffer,
        contentType?: string
    ): Promise<string> {
        try {
            const command = new PutObjectCommand({
                Bucket: this.bucket,
                Key: key,
                Body: buffer,
                ContentType: contentType,
            });

            await this.client.send(command);
            this.logger.info(`File uploaded: ${key}`);

            return `s3://${this.bucket}/${key}`;
        } catch (error: any) {
            this.logger.error('Error uploading buffer', error.message);
            throw new Error('S3 upload failed');
        }
    }

    /**
     * Generate a signed upload URL (PUT)
     */
    async generateUploadUrl(
        key: string,
        expiresIn = 3600,
        contentType?: string
    ): Promise<string> {
        try {
            const command = new PutObjectCommand({
                Bucket: this.bucket,
                Key: key,
                ContentType: contentType,
            });

            const signedUrl = await getSignedUrl(this.client, command, { expiresIn });
            this.logger.info(`Generated upload URL for key: ${key}`);

            return signedUrl;
        } catch (error: any) {
            this.logger.error('Error generating upload URL', error.message);
            throw new Error('Failed to generate upload URL');
        }
    }

    /**
     * Generate a signed download URL (GET)
     */
    async generateDownloadUrl(key: string, expiresIn = 3600): Promise<string> {
        try {
            const command = new GetObjectCommand({
                Bucket: this.bucket,
                Key: key,
            });

            const signedUrl = await getSignedUrl(this.client, command, { expiresIn });
            this.logger.info(`Generated download URL for key: ${key}`);

            return signedUrl;
        } catch (error: any) {
            this.logger.error('Error generating download URL', error.message);
            throw new Error('Failed to generate download URL');
        }
    }

    /**
     * Delete a file from S3
     */
    async deleteObject(key: string): Promise<boolean> {
        try {
            const command = new DeleteObjectCommand({
                Bucket: this.bucket,
                Key: key,
            });

            await this.client.send(command);
            this.logger.info(`Deleted object: ${key}`);

            return true;
        } catch (error: any) {
            this.logger.error('Error deleting object', error.message);
            return false;
        }
    }
}
