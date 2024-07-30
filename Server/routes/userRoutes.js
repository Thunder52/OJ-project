import express from 'express';
import User from '../models/Users.js'; // Adjust path as necessary
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/me', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ role: user.role });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;

