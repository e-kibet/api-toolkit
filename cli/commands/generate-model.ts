import fs from 'fs';
import path from 'path';

/**
 * Generates a new repository/model file.
 */
export const generateModel = async (name: string): Promise<void> => {
    const moduleDir = path.resolve(process.cwd(), 'src/modules', name.toLowerCase());
    const filePath = path.join(moduleDir, `${name}Repository.ts`);

    if (!fs.existsSync(moduleDir)) {
        fs.mkdirSync(moduleDir, { recursive: true });
    }

    const template = `import { BaseRepository } from '@forgekit/api';
import type { Model } from 'sequelize'; // or your ORM of choice

export class ${name}Repository extends BaseRepository<Model> {
  constructor(model: Model) {
    super(model);
  }
}
`;

    fs.writeFileSync(filePath, template, 'utf-8');
    console.log(`✅ Model/Repository created at: ${filePath}`);
};
