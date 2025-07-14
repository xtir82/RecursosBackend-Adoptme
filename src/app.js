import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { setupSwagger } from './swagger.js'; // Import the setupSwagger function
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT||8080;

setupSwagger(app); // Call the setupSwagger function to set up Swagger documentation

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks', mocksRouter);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT,()=>console.log(`Listening on ${PORT}`));
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
