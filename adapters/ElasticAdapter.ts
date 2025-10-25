import { Client } from '@elastic/elasticsearch';
import { Logger } from '../core/Logger';

export interface ElasticConfig {
    node: string; // e.g. https://search-your-domain.eu-central-1.es.amazonaws.com
    username?: string;
    password?: string;
    cloudId?: string; // if using Elastic Cloud
    apiKey?: string;
    tls?: { rejectUnauthorized?: boolean };
}

export class ElasticSearchAdapter {
    private client: Client;
    private logger = new Logger('ElasticSearchAdapter');

    constructor(config: ElasticConfig) {
        try {
            this.client = new Client({
                node: config.node,
                auth: config.apiKey
                    ? { apiKey: config.apiKey }
                    : config.username && config.password
                        ? { username: config.username, password: config.password }
                        : undefined,
                cloud: config.cloudId ? { id: config.cloudId } : undefined,
                tls: config.tls,
            });

            this.logger.info(`ElasticSearch client initialized for node: ${config.node}`);
        } catch (error: any) {
            this.logger.error('Error initializing ElasticSearch client', error.message);
            throw new Error(`Elastic initialization failed: ${error.message}`);
        }
    }

    /**
     * Index a document into an index
     */
    async indexDocument(index: string, id: string, body: Record<string, any>): Promise<void> {
        try {
            await this.client.index({
                index,
                id,
                body,
                refresh: true,
            });
            this.logger.info(`Indexed document ${id} into ${index}`);
        } catch (error: any) {
            this.logger.error('Error indexing document', error.message);
            throw new Error(error.message);
        }
    }

    /**
     * Get a document by ID
     */
    async getDocument<T>(index: string, id: string): Promise<T | null> {
        try {
            const result = await this.client.get({ index, id });
            return (result._source as T) || null;
        } catch (error: any) {
            if (error.meta?.statusCode === 404) return null;
            this.logger.error('Error fetching document', error.message);
            throw new Error(error.message);
        }
    }

    /**
     * Search documents using query DSL
     */
    async searchDocuments<T>(index: string, query: Record<string, any>): Promise<T[]> {
        try {
            const result = await this.client.search({
                index,
                body: query,
            });

            return (result.hits.hits.map((hit) => hit._source) as T[]) || [];
        } catch (error: any) {
            this.logger.error('Error executing search query', error.message);
            throw new Error(error.message);
        }
    }

    /**
     * Delete a document
     */
    async deleteDocument(index: string, id: string): Promise<boolean> {
        try {
            await this.client.delete({ index, id });
            this.logger.info(`Deleted document ${id} from ${index}`);
            return true;
        } catch (error: any) {
            if (error.meta?.statusCode === 404) return false;
            this.logger.error('Error deleting document', error.message);
            throw new Error(error.message);
        }
    }

    /**
     * Ping the Elasticsearch cluster
     */
    async ping(): Promise<boolean> {
        try {
            await this.client.ping();
            this.logger.info('Elasticsearch cluster is up ✅');
            return true;
        } catch (error: any) {
            this.logger.warn('Elasticsearch cluster is down ❌', error.message);
            return false;
        }
    }
}
