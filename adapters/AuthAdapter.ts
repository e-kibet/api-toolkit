import jwt from 'jsonwebtoken';
import { Logger } from '../core/Logger';

export interface AuthConfig {
    secret: string;
    expiresIn?: string | number;
}

export interface AuthTokenPayload {
    userId: string | number;
    email?: string;
    roles?: string[];
    iat?: number;
    exp?: number;
}

export class AuthAdapter {
    private logger: Logger;
    private readonly secret: string;
    private readonly expiresIn: string | number;

    constructor(config: AuthConfig) {
        this.secret = config.secret;
        this.expiresIn = config.expiresIn || '1h';
        this.logger = new Logger('AuthAdapter');
    }

    /**
     * Generate a JWT access token
     */
    generateToken(payload: AuthTokenPayload): string {
        try {
            return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
        } catch (error: any) {
            this.logger.error('Failed to generate token', error);
            throw new Error('Token generation failed');
        }
    }

    /**
     * Verify and decode a token
     */
    verifyToken(token: string): AuthTokenPayload | null {
        try {
            return jwt.verify(token, this.secret) as AuthTokenPayload;
        } catch (error: any) {
            this.logger.warn('Invalid or expired token', error.message);
            return null;
        }
    }

    /**
     * Express-compatible middleware for protecting routes
     */
    authenticate = (req: any, res: any, next: any) => {
        const header = req.headers['authorization'];
        if (!header || typeof header !== 'string') {
            return res.status(401).json({ status: false, message: 'Missing Authorization header' });
        }

        const token = header.split(' ')[1];
        const decoded = this.verifyToken(token);

        if (!decoded) {
            return res.status(401).json({ status: false, message: 'Invalid or expired token' });
        }

        req.user = decoded;
        next();
    };
}
