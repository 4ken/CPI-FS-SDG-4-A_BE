import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import corsOptionsDelegate from './middlewares/cors.middleware.js';
import router from './routes/route.js';

const app = express();
const port = process.env.PORT || 3000;
const dbURI = process.env.DB_URI;

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors(corsOptionsDelegate));
app.use('/api', router);

mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
