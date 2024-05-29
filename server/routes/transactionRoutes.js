import express from 'express';
import { createTransaction, getAllTransaction } from '../controllers/transactionController.js';

const router = express.Router();

router.get('/getall', getAllTransaction)

router.post('/add', createTransaction)

export default router;