import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import 'dotenv/config';
import router from './routes/route.js';

const app = express();
const port = process.env.PORT || 3000;
const dbHost = process.env.DB_HOST;

app.use(express.json());
app.use(morgan('tiny'));
app.use('/api', router);

mongoose
  .connect(dbHost)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
