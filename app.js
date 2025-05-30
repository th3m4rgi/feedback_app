import 'dotenv/config';
import express from 'express';
import apiRoutes from './routes/routes.js';
import connectDB from './config/db.js';
import cors from 'cors';

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use('/api/feedback', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

