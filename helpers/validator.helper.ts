import { z } from 'zod';

export const validateBody = (schema: z.ZodObject<any>) => {
    return (req: any, res: any, next: any) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ status: false, errors: result.error.errors });
        }
        next();
    };
};
