import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import transactionRoute from './routes/transactionRoutes.js'


dotenv.config();

const app = express();
app.use(cors(
    { origin: 'http://localhost:3000' }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/', transactionRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));