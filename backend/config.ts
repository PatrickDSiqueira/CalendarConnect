import dotenv from 'dotenv';

dotenv.config();

const config = {
    env: process.env.NODE_ENV || "development",
    debug: process.env.APP_DEBUG || "true",
    port: parseInt(process.env.PORT || "3000"),
    secret: process.env.SECRET,
    expireJwt: process.env.EXPIRE_JWT,
    getDataBaseConfig: () => ({
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || "3306"),
    }),
}

export default config;
