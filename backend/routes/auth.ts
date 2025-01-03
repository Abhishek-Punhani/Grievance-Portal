import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

const authRouter = express.Router();

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const user = req.user as IUser;
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
    res.redirect(`${frontendUrl}/loginPage?token=${token}`);
  }
);

export default authRouter;