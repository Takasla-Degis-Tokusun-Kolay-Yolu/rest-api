import dotenv from 'dotenv';

dotenv.config();
export const dbConfig = {
  mongoConnectionString: process.env.MONGO_ATLAS_URL,
};

export const appConfig = {
  appPort: process.env.APP_PORT,
};
