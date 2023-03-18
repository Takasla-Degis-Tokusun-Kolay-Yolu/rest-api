import dotenv from 'dotenv';

dotenv.config();
export const dbConfig = {
  mongoConnectionString: process.env.MONGO_ATLAS_URL,
};

export const appConfig = {
  appPort: process.env.APP_PORT,
};

export const jwtConfig = {
  jwtAccessSecret: process.env.ACCESS_TOKEN_SECRET_KEY,
  jwtRefreshSecret: process.env.REFRESH_TOKEN_SECRET_KEY,
};

export const cryptoConfig = {
  cryptoSecret: process.env.CRYPTO_SECRET_KEY,
};
