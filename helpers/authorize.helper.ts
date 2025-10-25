export const authorizePermission = (permission: string) => {
    return (req: any, res: any, next: any) => {
        const { permissions = [] } = req.user || {};
        if (!permissions.includes(permission)) {
            return res.status(403).json({ status: false, message: 'Forbidden' });
        }
        next();
    };
};
