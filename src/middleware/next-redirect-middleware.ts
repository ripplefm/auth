import { NextFunction, Request, Response } from 'express';
import { parse } from 'url';

export function nextRedirectMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { query } = req;
  req.session.next = undefined;
  if (query.next && query.next.startsWith('/')) {
    req.session.next = query.next;
  }
  next();
}

export function getNextRedirectUrl(
  req: Request,
  defaultRedirect: string = '/'
) {
  const { next } = req.session;
  req.session.next = undefined;
  return next ? next : defaultRedirect;
}
