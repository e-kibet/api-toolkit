export function Controller(basePath: string): ClassDecorator {
    return (target: any) => {
        Reflect.defineMetadata('basePath', basePath, target);
    };
}
