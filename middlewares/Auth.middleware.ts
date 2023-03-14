import { Request, Response, NextFunction } from 'express';

const verivyAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return res.status(400).json({ status: 'UNAUTHORIZED', code: 400 });
  next();
};

export default verivyAuth;
