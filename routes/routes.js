import express from 'express';
import { createOrUpdateFeedback, getUserFeedbackById, getUserFeedback, deleteUserFeedback } from '../controllers/UserFeedbackController.js';

const router = express.Router();

const validateRequest = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const { firstName, lastName, email, feedback, rating } = req.body;
    
    if (!firstName || !lastName || !email || !feedback || !rating) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (typeof firstName !== 'string' || typeof lastName !== 'string') {
      return res.status(400).json({ error: 'First and last names must be strings' });
    }
    
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be a number between 1 and 5' });
    }
  }
  next();
};

router.route('/')
  .post(validateRequest, createOrUpdateFeedback)
  .get(getUserFeedback);

router.route('/:id')
  .get(getUserFeedbackById)
  .delete(deleteUserFeedback)
  .put(validateRequest, createOrUpdateFeedback);


export default router;