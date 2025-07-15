const logger = (req, res, next) => {
    const { method, url, body } = req;
    console.log(`[${new Date().toISOString()}] ${method} ${url} | Body: ${JSON.stringify(body)}`);
    next();
};
export default logger;