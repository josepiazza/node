export function loggerMiddleware(req, res, next) {
    const { method, url } = req;

    console.log(`[${new Date().toISOString()}] ${method} ${url}`);

    next();
}
