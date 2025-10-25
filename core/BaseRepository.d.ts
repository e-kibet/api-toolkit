export declare abstract class BaseRepository<TModel> {
    protected readonly model: TModel;
    constructor(model: TModel);
    findAll(where?: Record<string, unknown>): Promise<any>;
    findById(id: number | string): Promise<any>;
    create(data: any): Promise<any>;
    update(id: number | string, data: any): Promise<any>;
}
