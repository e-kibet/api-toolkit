🧰 API Toolkit — Plug-and-Play Backend Framework for Modern TypeScript APIs

Developer-friendly. Opinionated. Extensible.
A modular TypeScript framework that gives backend developers everything they need to build scalable APIs fast — with clean architecture, reusable base classes, ready-made adapters, decorators, and a powerful CLI.

🚀 What It Does

API Toolkit standardizes backend development by giving teams a consistent foundation:

🔧 Base Classes – Abstract controllers, services, and repositories that eliminate boilerplate.

🧩 Adapters – Plug-and-play integrations for Redis, S3, Elasticsearch, and Auth systems.

🧠 Helpers – Built-in validation, authorization, crypto, and pagination utilities.

🧑‍💻 Decorators – Express-style route and validation decorators for clean, declarative endpoints.

⚙️ CLI Generator – Instantly scaffold new modules (controller, service, model) via npx api-toolkit.

📦 Type-Safe Core – Fully typed responses, repositories, and pagination models.

🏗️ Core Philosophy

“APIs should feel like they were built by one engineer, no matter how many people worked on them.”

Convention over configuration — focus on business logic, not setup.

Composable architecture — mix and match adapters and helpers.

Developer ergonomics first — a clean, predictable, and modern DX.

Framework-agnostic — works with Express, Fastify, or custom HTTP layers.

🧱 Folder Structure
src/
 ├── core/           # Base classes and types
 ├── helpers/        # Common reusable utilities
 ├── adapters/       # External service integrations
 ├── decorators/     # Route and validation decorators
 ├── cli/            # Code generation commands
 └── index.ts        # Toolkit exports

💡 Example Usage
import { BaseController, Route, Controller } from '@yourorg/api-toolkit';

@Controller('/tasks')
export class TaskController extends BaseController<TaskService> {
  @Route('get', '/')
  async getAll(req, res) {
    return this.handle(req, res, async () => this.service.getAllTasks());
  }
}

🧠 Ideal For

API teams that want consistent structure across multiple projects.

Developers building microservices, domain-driven backends, or clean architecture APIs.

Organizations that maintain shared internal libraries or SDKs for internal APIs.

🧩 Coming Soon

🧱 OpenAPI/Swagger auto-generation

🧩 Plugin registry for adapters

🪶 Lightweight request context (DI container)

🔐 Auth decorators for JWT/IAM integration

⚙️ Installation
npm install @yourorg/api-toolkit
# or
yarn add @yourorg/api-toolkit

🧑‍💻 Example Commands
npx api-toolkit generate:controller Task
npx api-toolkit generate:service Task
npx api-toolkit generate:model Task

🧾 License

MIT © [Your Organization or Name]