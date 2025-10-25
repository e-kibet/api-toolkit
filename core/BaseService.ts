export abstract class BaseService<R> {
    constructor(protected repository: R) { }
}
