import session from "express-session";

const secretKey = process.env.SECRET_KEY || 'default_secret_key';

export const authSession = session({
    secret: secretKey,
    name: 'user_id',
    cookie: {
        maxAge: 5 * 60 * 60 * 1000,
    },
    saveUninitialized: true,
    resave: true,
});