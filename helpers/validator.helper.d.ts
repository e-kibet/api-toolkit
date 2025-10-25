import { z } from 'zod';
export declare const validateBody: (schema: z.ZodObject<any>) => (req: any, res: any, next: any) => any;
