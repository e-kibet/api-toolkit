import fs from 'fs';
import path from 'path';

/**
 * Generates a new service file with base logic.
 */
export const generateService = async (name: string): Promise<void> => {
    const moduleDir = path.resolve(process.cwd(), 'src/modules', name.toLowerCase());
    const filePath = path.join(moduleDir, `${name}Service.ts`);

    if (!fs.existsSync(moduleDir)) {
        fs.mkdirSync(moduleDir, { recursive: true });
    }

    const template = `import { BaseService } from '@forgekit/api';
import { ${name}Repository } from './${name}Repository';

export class ${name}Service extends BaseService<${name}Repository> {
  constructor(repository: ${name}Repository) {
    super(repository);
  }

  async getAll${name}s() {
    return this.repository.findAll();
  }
}
`;

    fs.writeFileSync(filePath, template, 'utf-8');
    console.log(`✅ Service created at: ${filePath}`);
};
