import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import Routes from './routes/index.js';
import { appConfig, dbConfig } from './config/index.js';

const CONNECTION_URL = dbConfig.mongoConnectionString;
const PORT = process.env.PORT || appConfig.appPort;

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('dev'));
app.use(cors());

mongoose
  .connect(CONNECTION_URL.toString(), { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
      app.use('/users', Routes.UserRouter);
      app.use('/categories', Routes.CategoryRouter);
      app.use('/products', Routes.ProductRouter);
      app.use('/offers', Routes.OfferRouter);

      // Page Not Found
      app.use((req, res, next) => {
        const error = new Error('Aradağınız sayfa bulunamadı.');
        error.status = 404;
        next(error);
      });
    });
  })
  .catch((error) => console.log(error.message));
