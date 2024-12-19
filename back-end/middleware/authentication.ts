import { expressjwt } from 'express-jwt';

const authenticationMiddleware = expressjwt({
    secret: process.env.JWT_SECRET || 'default_secret',
    algorithms: ['HS256'],
}).unless({
    path: ['/api-docs', /^\/api-docs\/.*/, '/users/login', '/users/signup', '/status'],
});

export default authenticationMiddleware;
