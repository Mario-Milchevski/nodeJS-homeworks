import session from "express-session";

export const authSession = session({
    secret: 'user_super_secret_code_123',
    name: 'user_id',
    cookie: {
        maxAge: 1 * 60 * 60 * 1000,
    },
    saveUninitialized: true,
    resave: true,
});