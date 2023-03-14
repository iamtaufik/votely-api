import express, { Router } from 'express';
import passport from 'passport';

const authRoute: Router = express.Router();

authRoute.get('/login/failed', (req, res) => {
  res.status(401).json({ status: 'UNAUTHORIZED', code: 401 });
});

authRoute.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({ status: 'AUTHORIZED', code: 200, user: req.user });
  } else {
    res.redirect('/api/auth/login/failed');
  }
});

authRoute.get('/logout', (req, res, done) => {
  try {
    // @ts-ignore
    req.logout();
    res.redirect(String(process.env.CLIENT_URL));
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

authRoute.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
authRoute.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: String(process.env.CLIENT_URL),
    failureRedirect: '/api/auth/login/failed',
  })
);

export default authRoute;
