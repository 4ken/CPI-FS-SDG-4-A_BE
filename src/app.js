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

if (!dbURI) {
  throw new Error('DB_URI environment variable is missing');
}

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors(corsOptionsDelegate));
app.use('/api', router);

app.get('/', (_, res) => {
  res.send('Server is up and running.');
});

mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(({ message }) => {
    console.log('Database connection error:', message);
  });
