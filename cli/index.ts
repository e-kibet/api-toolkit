#!/usr/bin/env node
import { Command } from 'commander';
import { generateController } from './commands/generate-controller';
import { generateService } from './commands/generate-service';
import { generateModel } from './commands/generate-model';

const program = new Command();
program.name('api-toolkit').description('CLI for API Toolkit').version('1.0.0');

program.command('generate:controller <name>').action(generateController);
program.command('generate:service <name>').action(generateService);
program.command('generate:model <name>').action(generateModel);

program.parse();
