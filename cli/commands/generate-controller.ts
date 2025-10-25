import fs from 'fs';
import path from 'path';

/**
 * Generates a new controller file with base structure.
 */
export const generateController = async (name: string): Promise<void> => {
    const moduleDir = path.resolve(process.cwd(), 'src/modules', name.toLowerCase());
    const filePath = path.join(moduleDir, `${name}Controller.ts`);

    // Ensure directory exists
    if (!fs.existsSync(moduleDir)) {
        fs.mkdirSync(moduleDir, { recursive: true });
    }

    // Template content
    const template = `import { BaseController } from '@forgekit/api';
import type { Request, Response, NextFunction } from 'express';

export class ${name}Controller extends BaseController<any> {
  constructor(service: any) {
    super(service);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    return this.handle(req, res, next, async () => {
      return { message: '${name}Controller is working 🚀' };
    });
  }
}
`;

    fs.writeFileSync(filePath, template, 'utf-8');
    console.log(`✅ Controller created at: ${filePath}`);
};
