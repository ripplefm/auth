import { NextFunction, Response } from 'express';
import { UserRequest } from '../types/user-request';

export function ensureLoggedInMiddleware(
  req: UserRequest,
  res: Response,
  next: NextFunction
) {
  if (req.session.user) {
    req.user = req.session.user;
    next();
  } else {
    return res.redirect('/login?next=' + encodeURIComponent(req.originalUrl));
  }
}
