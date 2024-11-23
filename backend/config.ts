import dotenv from 'dotenv';

dotenv.config();

const config = {
    env: process.env.NODE_ENV || "development",
    debug: process.env.APP_DEBUG || "true",
    port: parseInt(process.env.PORT || "3000"),
    secret: process.env.SECRET,
    expireJwt: process.env.EXPIRE_JWT,
    frontendURL: process.env.FRONT_END_URL,
}

export default config;
