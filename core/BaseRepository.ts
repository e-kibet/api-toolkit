export abstract class BaseRepository<TModel> {
    constructor(protected readonly model: TModel) { }

    async findAll(where?: Record<string, unknown>) {
        // Example for Sequelize or Prisma
        return (this.model as any).findAll({ where });
    }

    async findById(id: number | string) {
        return (this.model as any).findByPk(id);
    }

    async create(data: any) {
        return (this.model as any).create(data);
    }

    async update(id: number | string, data: any) {
        return (this.model as any).update(data, { where: { id } });
    }
}
