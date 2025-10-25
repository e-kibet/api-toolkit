export function Controller(basePath: string): ClassDecorator {
    return (target: any) => {
        (Reflect as any).defineMetadata('basePath', basePath, target);
    };
}
